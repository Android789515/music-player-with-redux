import React from 'react'

import '../../css/library-styles/add-entry-styles.scss'

const AddEntryBtn = props => {
    return (
        <div className='btn add-entry-section overlay-component' onClick={() => {
            props.doOnClick()
        }}>
            <button className='btn'>+</button>
            <p className={`add-entry-text`}>{props.btnText}</p>

            {props.uploadInput}
        </div>
    )
}

export default AddEntryBtn