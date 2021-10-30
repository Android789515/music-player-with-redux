import React from 'react'

import '../../../css/library-styles/library-directory-styles.scss'

const Directory = props => {
    return (
        <div className={`directory ${props.name}-directory hard-rounded-corners`}>
            <ul className='unstyled-ul directory-entries'>
                {props.entries}
            </ul>

            {props.children}
        </div>
    )
}

export default Directory