import React from 'react'

function MediaControlBtn(props) {
    const { name, isVolumeBtn, btnTheme, handleMediaBtnClick } = props

    let className
    let src
    if (isVolumeBtn) {
        className = `btn media-control-btn vol-control-btn ${name}-btn ${btnTheme}-btn`
        src = require(`../../img/${btnTheme}-btns/vol-btns/${name}-btn.svg`).default
    } else {
        className = `btn media-control-btn ${name}-btn ${btnTheme}-btn`
        src = require(`../../img/${btnTheme}-btns/media-btns/${name}-btn.svg`).default
    }

    return (
        <img
            name={name}
            className={className}
            src={src}
            alt={name}
            onClick={handleMediaBtnClick}
        />
    )
}

MediaControlBtn.defaultProps = {
    btnTheme: 'dark'
}

export default MediaControlBtn