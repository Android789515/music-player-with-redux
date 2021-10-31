import React, { useEffect } from 'react'

// Modal renders a special prompt component that will vary
const Modal = props => {

    const hideModal = () => {
        const thisComponent = document.querySelector('.modal')
        thisComponent.classList.add('hidden')
    }

    const closeModalWhen = event => {
        if (props.closeWhen) {
            props.closeWhen(event) && hideModal()
        }

        event.key === 'Escape' && hideModal()
    }


    useEffect(() => {
        document.body.addEventListener('keydown', closeModalWhen)

        return () => {
            document.body.removeEventListener('keydown', closeModalWhen)
        }
    }, [])

    return (
        <div className='modal hidden'>
            {props.children}
        </div>
    )
}

export default Modal