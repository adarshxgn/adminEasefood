import React, { createContext, useState } from 'react'
export const addResponceContext = createContext()
export const editResponceContext = createContext()

const ContextShare = ({children}) => {
  const[addResponce, setAddResponce] = useState("")
  const[editResponce,setEditResponce] = useState("")
  return (
    <addResponceContext.Provider value={{addResponce, setAddResponce}}>
      <editResponceContext.Provider value={{editResponce,setEditResponce}}>
      {children}
      </editResponceContext.Provider>
    </addResponceContext.Provider>
  )
}

export default ContextShare