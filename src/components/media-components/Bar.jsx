import React, { useEffect, useRef, useState } from 'react'

import styles from '../../css/media-player/Bar.module.scss'

import { setVolume, updateTime } from '../../reducers/mediaSlice'

import Slider from './Slider'

function Bar(props) {
    const [ canMoveBar, toggleBarMovement ] = useState(false)
    const [ isMouseDownOnBar, setMouseDownOnBar ] = useState(false)

    const validBars = {
        _SONG: 'song',
        _VOLUME: 'volume'
    }

    const orientations = {
        _VERTICAL: 'vertical',
        _HORIZONTAL: 'horizontal'
    }

    const setBarPercent = (pos, size) => {
        if (props.name === validBars._VOLUME) {
            return Math.round( (pos / size) * 10) * 10
        } else {
            return (pos / size) * 100
        }
    }

    // Allows user to set the slider to 0 when they click the beginning of the bar
    // and 100 when they click the end
    const formatBarPercent = percent => {
        const isBeginningOfBar = percent < 1 && percent !== 0
        const isEndOfBar = percent > 99 && percent !== 100

        if (isBeginningOfBar) {
            return 0
        } else if (isEndOfBar) {
            return 100
        }

        return percent
    }

    const handleBarDrag = event => {
        event.preventDefault()

        const isBarVertical = props.orientation === orientations._VERTICAL

        const bar = event.target

        const barSize = isBarVertical ? bar.clientHeight : bar.clientWidth

        // Margins screw with this so the posOfBar must be subtracted
        // from the rawPos
        const rawPosClickedInBar = isBarVertical ? event.clientY : event.clientX
        const barBoundingRect = bar.getBoundingClientRect()
        const posOfBar = isBarVertical ? barBoundingRect.bottom : barBoundingRect.left

        // calculatedPos accurately calculates where in the actual bar was clicked
        // regardless of margin
        const calculatedPos = isBarVertical ? posOfBar - rawPosClickedInBar : rawPosClickedInBar - posOfBar

        const percentOfBarClicked = formatBarPercent(setBarPercent(calculatedPos, barSize))

        setSliderVal(percentOfBarClicked)
    }

    const setSliderVal = percent => {
        let sliderVal
        switch (props.name) {
            case validBars._SONG:
                // Prevents bug where the song audio will not play
                // possibly due to the song time being set to a number
                // with 15 decimal places
                sliderVal = ((percent / 100) * props.media.maxTime).toFixed(1)
                // Connect to redux
                props.dispatch(updateTime(sliderVal))
                break

            case validBars._VOLUME:
                sliderVal = percent / 100
                // Connect to redux
                props.dispatch(setVolume(sliderVal))
                break

            default:
                break
        }
    }

    const disableBarMovement = () => {
        setMouseDownOnBar(() => false)
        toggleBarMovement(() => false)
        document.body.removeEventListener('mouseup', disableBarMovement)
    }

    useEffect(() => {
        // Must be an arrow function to work properly, for some reason
        document.body.addEventListener('mouseup', () => disableBarMovement())
    }, [])

    const getSliderPercent = () => {
        switch (props.name) {
            case validBars._SONG:
                const songTime = props.media.time > 0 ?
                    (props.media.time / props.media.maxTime) * 100 : 0
                return songTime

            case validBars._VOLUME:
                return props.media.volume * 100

            default: // slider will default to val of 0 if undefined
                return
        }
    }
    const sliderPercent = getSliderPercent()

    const barType = styles[`${props.name}Bar`]

    const allComponentClasses = `${styles.bar} ${barType} ${props.modifiers.join(' ')}`

    return (
        <div
            className={allComponentClasses}
            draggable={true}
            onMouseDown={event => {
                event.preventDefault()
                setMouseDownOnBar(() => true)
                toggleBarMovement(() => true)
                handleBarDrag(event)

                if (props.alsoDoOnClick) {
                    props.alsoDoOnClick()
                }
            }}
            onMouseUp={event => {
                event.preventDefault()
                disableBarMovement()
            }}
            onMouseMove={event => {
                if (canMoveBar || isMouseDownOnBar) {
                    handleBarDrag(event)
                }
            }}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            <Slider
                orientation={props.orientation}
                name={props.name}
                sliderPercent={sliderPercent}
            />
        </div>
    )
}

Bar.defaultProps = {
    modifiers: ['']
}

export default Bar