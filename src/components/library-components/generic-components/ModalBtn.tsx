import React from 'react'

// @ts-ignore
import { hardRoundedCorners } from '../../../css/GenericStyles.module.scss'
// @ts-ignore
import { btn } from '../../../css/buttons/Btn.module.scss'
// @ts-ignore
import { modalBtnBase, modalBtn, disabled as disabledStyle } from '../../../css/buttons/ModalBtn.module.scss'

interface Props {
    btnText: string
    disabled: boolean
    doOnClick: () => void
    onMouseEnter: () => void
    onMouseLeave: () => void
}

const ModalBtn = ({ btnText, disabled, doOnClick, onMouseEnter, onMouseLeave }: Props) => {
    return (
        <button className={`${modalBtnBase} ${hardRoundedCorners}`} disabled={disabled}>
            <span
                className={`${btn} ${modalBtn} ${hardRoundedCorners} ${disabled ? disabledStyle : ''}`.trim()}
                onClick={doOnClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {btnText}
            </span>
        </button>
    )
}

export default ModalBtn