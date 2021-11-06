import React from 'react'

const ModalBtn = ({ doOnClick, btnText, ...props }) => {
    return (
        <button className='modal-btn-base hard-rounded-corners' {...props} >
            <span
                className={`btn modal-btn hard-rounded-corners ${props.disabled ? 'disabled' : ''}`.trim()}
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