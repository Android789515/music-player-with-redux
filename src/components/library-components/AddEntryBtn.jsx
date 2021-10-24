import React from 'react'

import '../../css/library-styles/add-entry-styles.scss'
import SongUploader from './SongUploader'

const AddEntryBtn = props => {
    return (
        <div className='btn add-entry-section overlay-component' onClick={() => {
            props.doOnClick()
        }}>
            <button className='btn'>+</button>
            <p className={`add-entry-text`}>{props.btnText}</p>

            {props.hasInputComponent && <SongUploader dispatch={props.dispatch} />}
        </div>
    )
}

export default AddEntryBtn