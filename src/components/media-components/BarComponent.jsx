import React, { useState } from 'react'

import '../../css/media-styles/bar-styles.scss'

import { setVolume, updateTime } from '../../reducers/mediaSlice'

import SliderComponent from './SliderComponent'

function BarComponent(props) {
    const [moveBar, toggleBarMovement] = useState(false)
    const [mouseDownOnBar, setMouseDownOnBar] = useState(false)

    const setEventTargetToBar = event => {
        if (!event.target.classList.contains(`${props.name}-bar`)) {
            event.target = event.target.parentElement
        }
    }

    const setBarPercent = (pos, size) => {
        if (props.orientation === 'vertical') {
            return Math.round( (pos / size) * 10) * 10
        } else {
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
        const isBarVertical = props.orientation === 'vertical'

        setEventTargetToBar(event)

        const barSize = isBarVertical ? event.target.clientHeight : event.target.clientWidth

        const posClicked = isBarVertical ? event.clientY : event.clientX
        const relativePos = isBarVertical ?
            event.target.getBoundingClientRect().bottom :
            event.target.getBoundingClientRect().left

        // calculatedPos accurately calculates where in the actual bar was clicked
        // regardless of margin
        const calculatedPos = isBarVertical ? relativePos - posClicked : posClicked - relativePos

        const percentOfBarClicked = formatBarPercent(setBarPercent(calculatedPos, barSize))

        let sliderVal
        switch (props.name) {
            case 'song':
                sliderVal = Math.floor((percentOfBarClicked / 100) * props.media.maxTime)
                props.dispatch(updateTime(sliderVal))
                break

            case 'volume':
                sliderVal = percentOfBarClicked / 100
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

    document.body.addEventListener('mouseup', disableBarMovement)

    const songTime = props.media.time > 0 ?
        (props.media.time / props.media.maxTime) * 100 : 0

    const sliderPercent = props.orientation === 'vertical' ?
        props.media.volume * 100 : songTime

    return (
        <div
            className={`bar ${props.name}-bar`}
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
                if (moveBar || mouseDownOnBar) {
                    handleBarDrag(event)
                }
            }}
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