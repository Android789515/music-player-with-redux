import React from 'react'

const Tooltip = props => {
    return (
        <div className='tooltip'>
            <p className='tooltip-text'>{props.text}</p>
        </div>
    )
}

export default Tooltip