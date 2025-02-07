import React, { createContext, useEffect, useState } from 'react'
export const tokenAuthcontext=createContext()

const AuthContextAPI = ({children}) => {
    const [isAuthorized,setIsAuthorized]=useState(false)

  return (
    <tokenAuthcontext.Provider value={{isAuthorized,setIsAuthorized}}>
        {children}
    </tokenAuthcontext.Provider>
  )
}

export default AuthContextAPI