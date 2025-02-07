import React, { createContext, useState } from 'react'
 
export const addProjectResponseContext=createContext()
export const editProjectResponseContext=createContext()


const ContextApi = ({children}) => {    //children is defualt in context api which have to wrapped inside the context
    const [addProjectResponse,setAddProjectResponse]=useState("")
    const [editProjectResponse,setEditProjectResponse]=useState("")

  return (
    <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
      <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
          {children}
      </addProjectResponseContext.Provider>
    </editProjectResponseContext.Provider>
  )
}

export default ContextApi