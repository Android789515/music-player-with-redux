import React, {useEffect, useState} from 'react'

import '../../css/media-styles/bar-styles.scss'

import { setVolume, updateTime } from '../../reducers/mediaSlice'

import SliderComponent from './SliderComponent'

function BarComponent(props) {
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

    const getBarElementOfClickedBar = event => {
        if (!event.target.classList.contains(`${props.name}-bar`)) {
            event.target = event.target.parentElement
        }

        return event.target
    }

    const setBarPercent = (pos, size) => {
        switch (props.name) {
            case validBars._SONG:
                return Math.round( (pos / size) * 100)
            case validBars._VOLUME:
                return Math.round( (pos / size) * 10) * 10

            default:
                return Math.round( (pos / size) * 100)
        }
    }

    // Allows user to set the slider to 0 when they click the beginning of the bar
    // and 100 when they click the end
    const formatBarPercent = percent => {
        if (percent < 1 && percent !== 0) {
            return 0
        } else if (percent > 99 && percent !== 100) {
            return 100
        } else {
            return percent
        }
    }

    const handleBarDrag = event => {
        event.preventDefault()

        const isBarVertical = props.orientation === orientations._VERTICAL

        const bar = getBarElementOfClickedBar(event)

        const barSize = isBarVertical ? bar.clientHeight : bar.clientWidth

        // Margins screw with this so the posOfBar must be subtracted
        // from the rawPos
        const rawPosClickedInBar = isBarVertical ? event.clientY : event.clientX
        const barBoundingRect = event.target.getBoundingClientRect()
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
                sliderVal = Math.floor((percent / 100) * props.media.maxTime)
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

    const allComponentClasses = `bar ${props.name}-bar ${
        props.modifiers ? props.modifiers.join(' ') : ''
    }`.trim()
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
            <SliderComponent
                orientation={props.orientation}
                name={props.name}
                sliderPercent={sliderPercent}
            />
        </div>
    )
}

export default BarComponent