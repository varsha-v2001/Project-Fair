import React, { useContext, useState } from 'react'
import loginImg from '../assets/login_img.png'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import { tokenAuthcontext } from '../contexts/AuthContextAPI'




const Auth = ({ insideRegister }) => {
  const {isAuthorized,setIsAuthorized}=useContext(tokenAuthcontext)
  const [inputData,setInputData]=useState({
    username:"",email:"",password:""
  })
  // console.log(inputData);
  const navigate=useNavigate()
  const [isLogin,setIsLogin]=useState(false)
  
  const handleRegister= async (e)=>{
    e.preventDefault()
    console.log("inside handleRegister");
    
    if (inputData.username && inputData.email && inputData.password) {
      // alert('Make API call !!')
      try {
        const result=await registerAPI(inputData)
        console.log(result);
        if (result.status==200) {
          alert(`Welcome ${result.data.username}, Please login to explore our website..!!`)
          navigate('/login')
          setInputData({username:"",email:"",password:""})
        }else{
          if (result.response.status==406) {
            alert(result.response.data)
            setInputData({username:"",email:"",password:""})
            navigate('/login')
          }
        }
        
      } catch (error) {
        console.log(error);
        
      }
    } else {
      alert('Please fill the form !!!')
    }
  }


  const handleLogin = async (e)=>{
    e.preventDefault()
    if (inputData.email && inputData.password) {
      try {
        const result = await loginAPI(inputData)
        if (result.status==200) {
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setIsLogin(true)
          setIsAuthorized(true)
          setTimeout(()=>{
            setInputData({ username:"",email:"",password:""})
            navigate('/')
            setIsLogin(false)
          },2000)
        }else{
          if (result.response.status==404) {
            alert(result.response.data)
          }
        }
      } catch (error) {
        console.log(error);
        
      }
    } else {
      alert("Please fill the form completely!!")
    }
  }




  return (
    <div style={{ minHeight: '100vh', width: '100%' }} className='d-flex justify-content-center align-items-center'>
      <div className='container w-75'>
        <div className='card shadow p-2'>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src={loginImg} className='img-fluid' alt="" />
            </div>
            <div className="col-lg-6">
              <h1 className='mt-2'><i className="fa-brands fa-docker me-2"></i>Project Fair</h1>
              <h5 className='mt-2'>Sign {insideRegister ? "up" : "in"} to your Account</h5>
              <Form>
                {
                  insideRegister &&
                  <FloatingLabel controlId="floatingInputNAme" label="Username" className="mb-3">
                    <Form.Control onChange={e=>setInputData({...inputData,username:e.target.value})} value={inputData.username} type="text" placeholder="Username" />
                  </FloatingLabel>
                }
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                  <Form.Control onChange={e=>setInputData({...inputData,email:e.target.value})} value={inputData.email} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control onChange={e=>setInputData({...inputData,password:e.target.value})} value={inputData.password} type="password" placeholder="Password" />
                </FloatingLabel>
                {
                  insideRegister ?
                  <div className='mt-3'> 
                    <button onClick={handleRegister} className='btn btn-primary mb-2'>Register</button>
                    <p>Already an user? Please click here to <Link to={'/login'}>Login</Link></p>
                  </div>
                  :
                  <div className='mt-3'>
                    <button onClick={handleLogin} className='btn btn-primary mb-2'>Login
                      {
                        isLogin && <Spinner className='ms-2' size='sm' animation="border" variant="light" />
                      }
                    </button>
                    <p>New user? Please click here to <Link to={'/register'}>register</Link></p>
                  </div>
                }
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth