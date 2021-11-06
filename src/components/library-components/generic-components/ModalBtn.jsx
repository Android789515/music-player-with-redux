import React from 'react'

const ModalBtn = ({ doOnClick, btnText, ...props }) => {
    return (
        <button className='modal-btn-base hard-rounded-corners' disabled={props.disabled || false} >
            <span
                className={`btn modal-btn hard-rounded-corners ${props.disabled ? 'disabled' : ''}`.trim()}
                onClick={doOnClick}
            >
                {btnText}
            </span>
        </button>
    )
}

export default ModalBtn