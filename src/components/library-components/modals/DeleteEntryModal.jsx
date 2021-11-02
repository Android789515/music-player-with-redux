import React from 'react'

import '../../../css/modal-styles.scss'

const DeleteEntryModal = props => {
    const handleClick = event => {

    }

    const handleKeyPress = ({ key }) => {

    }

    return (
        <div className='delete-entry-modal modal-content hard-rounded-corners'>
            <h2>Are you sure you would like to delete {props.entryName}?</h2>

            <p>
                <button className='modal-btn-bg hard-rounded-corners' >
                    <span
                        className='btn no-btn hard-rounded-corners'
                        onClick={handleClick}
                        onKeyDown={handleKeyPress}
                    >
                        No
                    </span>
                </button>
            </p>

            <p>
                <button className='modal-btn-bg hard-rounded-corners' >
                    <span
                        className='btn yes-btn hard-rounded-corners'
                        onClick={handleClick}
                        onKeyDown={handleKeyPress}
                    >
                        Yes
                    </span>
                </button>
            </p>
            {/* Overall styling
                    I think I might use grid for this
                    2 rows / 2 cols

                    h2 on first row spanning 2 cols
                    yes button on second row first col
                    gap in between
                    no button on second row second col
                 */}

            {/* Big h2 saying: "Are you sure you want to delete?" */}

            {/* Yes/No buttons */}
        </div>
    )
}

export default DeleteEntryModal