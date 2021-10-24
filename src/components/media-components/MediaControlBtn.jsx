import React from 'react'

function MediaControlBtn(props) {
    const { name, unique, isDark, handleMediaBtnClick } = props
    const buttonTheme = isDark ? 'dark' : 'light'

    let className
    let src
    if (unique) {
        const isVolBtn = 'muted' || name.split('-').at(-1) === 'vol'

        if (isVolBtn) {
            className = `btn media-control-btn vol-control-btn ${name}-btn ${buttonTheme}-btn`
            src = require(`../../img/${buttonTheme}-btns/vol-btns/${name}-btn.svg`).default
        }
    } else {
        className = `btn media-control-btn ${name}-btn ${isDark ? 'dark-btn' : 'light-btn'}`
        src = require(`../../img/${buttonTheme}-btns/media-btns/${name}-btn.svg`).default
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
    isDark: true
}

export default MediaControlBtn