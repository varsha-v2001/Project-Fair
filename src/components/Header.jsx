import React, { useContext } from 'react'
import { Container, Navbar, NavbarBrand } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthcontext } from '../contexts/AuthContextAPI'

const Header = (insideDashboard) => {
  const {isAuthorized,setIsAuthorized}=useContext(tokenAuthcontext)
  const navigate=useNavigate()

  const logout=()=>{
    sessionStorage.clear()
    setIsAuthorized(false)
    navigate('/')
  }

  return (
    <Navbar style={{ zIndex: 1 }} className="border ronded position-fixed w-100">
      <Container>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <Navbar.Brand style={{ color: 'white' }} className=' fw-bolder'>
            <i class="fa-brands fa-docker me-2"></i>
            Project Fair
          </Navbar.Brand>
        </Link>
        {
          insideDashboard &&
          <div className='ms-auto'>
            {
              isAuthorized &&
              <button onClick={logout} className='btn btn-link'>Logout<i className='fa-solid fa-right-from-bracket ms-1'></i></button>
            }
          </div>
        }
      </Container>
    </Navbar>
  )
}

export default Header