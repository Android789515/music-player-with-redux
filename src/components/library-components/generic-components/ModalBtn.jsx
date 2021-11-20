import React from 'react'

import { hardRoundedCorners } from '../../../css/modules/GenericStyles.module.scss'
import { modalBtnBase, modalBtn, disabled } from '../../../css/modules/Modal.module.scss'

const ModalBtn = ({ doOnClick, btnText, ...props }) => {
    return (
        <button className={`${modalBtnBase} ${hardRoundedCorners}`} {...props} >
            <span
                className={`btn ${modalBtn} ${hardRoundedCorners} ${props.disabled ? disabled : ''}`.trim()}
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