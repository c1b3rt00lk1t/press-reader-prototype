import { createContext, useState } from "react"

const PressReaderContext = createContext()


export const PressReaderContextProvider = ({children}) => {
    const [selectedPost, setSelectedPost] = useState()
  
    return (
    <PressReaderContext.Provider value={{selectedPost, setSelectedPost}}>
        {children}
    </PressReaderContext.Provider>
  )
}

export default PressReaderContext