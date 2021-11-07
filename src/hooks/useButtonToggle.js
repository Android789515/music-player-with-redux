import { useState } from 'react'


const useButtonToggle = (initialState = false) => {
    const [ isToggled, setIsToggled ] = useState(initialState)

    const toggle = () => setIsToggled(prevToggleState => !prevToggleState)

    return { isToggled, toggle }
}

export default useButtonToggle