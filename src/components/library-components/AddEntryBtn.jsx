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

            {props.hasInputComponent && <SongUploader uploadTo={props.uploadTo} dispatch={props.dispatch} />}
        </div>
    )
}

AddEntryBtn.defaultProps = {
    uploadTo: 'songs'
}

export default AddEntryBtn