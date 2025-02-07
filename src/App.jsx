import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import { useContext, useEffect } from 'react'
import { tokenAuthcontext } from './contexts/AuthContextAPI'
import Pnf from './pages/Pnf'

function App() {

  const {isAuthorized,setIsAuthorized}=useContext(tokenAuthcontext)
  
  return (
    <>

      <Routes>
        <Route path='/' element={<Home/>} />
        {
          isAuthorized && 
          <>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/projects' element={<Projects/>} />
          </>
        }

        {/* <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/projects' element={<Projects/>} /> */}
        <Route path='/login' element={<Auth/>} />
        <Route path='/register' element={<Auth insideRegister={true}/>} />
        <Route path='/*' element={<Pnf/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
