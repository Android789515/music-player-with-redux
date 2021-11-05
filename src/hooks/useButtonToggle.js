import { useState } from 'react'


const useButtonToggle = () => {
    const [ isToggled, setIsToggled ] = useState(false)

    const toggle = () => setIsToggled(prevToggleState => !prevToggleState)

    return { isToggled, toggle }
}

export default useButtonToggle