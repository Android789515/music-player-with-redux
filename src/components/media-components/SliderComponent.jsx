import React from 'react'

import styles from '../../css/modules/media-player/Bar.module.scss'

function SliderComponent(props) {
    const percent = props.orientation === 'vertical' ?
        { width: '100%', height: props.sliderPercent + '%' } :
        { width: props.sliderPercent + '%', height: '100%' }

    return (
        <div className={styles.slider} style={percent} />
    )
}

SliderComponent.defaultProps = {
    sliderPercent: '0'
}

export default SliderComponent