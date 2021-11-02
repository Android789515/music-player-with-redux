import React, { useRef } from 'react'

import '../../css/library-styles/add-entry-styles.scss'

import SongUploader from './SongUploader'

const AddEntryBtn = props => {
    const uploaderRef = useRef(undefined)

    const uploadIfHasInputComponent = () => {
        const uploader = uploaderRef.current
        if (uploader) {
            uploader.click()
        } else if (props.doOnClick) {
            props.doOnClick()
        }
    }

    return (
        <div className='btn add-entry-section' onClick={uploadIfHasInputComponent}>
            <button className='btn'>+</button>
            <p className={`add-entry-text`}>{props.btnText}</p>

            {props.hasInputComponent && (
                <SongUploader
                    uploadTo={props.uploadTo}
                    uploaderRef={uploaderRef}
                    dispatch={props.dispatch}
                />
            )}
        </div>
    )
}

AddEntryBtn.defaultProps = {
    uploadTo: 'songs'
}

export default AddEntryBtn