import React from 'react'

function SliderComponent(props) {
    const percent = props.orientation === 'vertical' ?
        { width: '100%', height: props.sliderPercent + '%' } :
        { width: props.sliderPercent + '%', height: '100%' }

    return (
        <div className={`slider ${props.name}-slider`} style={percent} />
    )
}

SliderComponent.defaultProps = {
    sliderPercent: '0'
}

export default SliderComponent