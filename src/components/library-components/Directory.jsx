import React from 'react'

import '../../css/library-styles/library-directory-styles.scss'

const Directory = props => {
    return (
        <div className={`directory ${props.name}-directory`}>
            {/*<div className='directory-entries-area'>*/}
            {/*    <ul className='non-default-ul directory-entries'>*/}
            {/*        {props.entries}*/}
            {/*    </ul>*/}
            {/*</div>*/}
            <ul className='non-default-ul directory-entries'>
                {props.entries}
            </ul>

            {props.children}
        </div>
    )
}

export default Directory