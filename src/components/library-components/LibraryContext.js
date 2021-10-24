import React from 'react'

const { Provider, Consumer } = React.createContext(false)

const LibraryContextProvider = props => {
    return (
        <Provider value={false}>
            {props.children}
        </Provider>
    )
}

export { LibraryContextProvider, Consumer as LibraryContextConsumer }