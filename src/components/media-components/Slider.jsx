import React from 'react'

import styles from '../../css/media-player/Bar.module.scss'

function Slider(props) {
    const percent = props.orientation === 'vertical' ?
        { width: '100%', height: props.sliderPercent + '%' } :
        { width: props.sliderPercent + '%', height: '100%' }

    const sliderType = styles[`${props.name}Slider`]
    return (
        <div className={`${styles.slider} ${sliderType}`} style={percent} />
    )
}

Slider.defaultProps = {
    sliderPercent: '0',
    name: ''
}

export default Slider