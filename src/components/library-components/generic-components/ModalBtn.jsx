import React from 'react'

const ModalBtn = ({ doOnClick, btnText, ...props }) => {
    return (
        <button className='modal-btn-base hardRoundedCorners' {...props} >
            <span
                className={`btn modal-btn hardRoundedCorners ${props.disabled ? 'disabled' : ''}`.trim()}
                onClick={doOnClick}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
            >
                {btnText}
            </span>
        </button>
    )
}

export default ModalBtn