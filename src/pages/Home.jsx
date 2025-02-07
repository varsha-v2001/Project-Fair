import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../assets/landing_img.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { getHomeProjectAPI } from '../services/allAPI'

const Home = () => {

  const [allHomeProjects,setAllHomeProjects]=useState([])

  const navigate=useNavigate()

  const handleProjects=()=>{
    if (sessionStorage.getItem("token")) {
      navigate('/projects')
    } else {
      alert("Please login to get full access...!!!")
    }
  }

  useEffect(()=>{
    getAllHomeProjects()
  },[])


  const getAllHomeProjects=async()=>{
    try {
      const result=await getHomeProjectAPI()
      if (result.status==200) {
        setAllHomeProjects(result.data)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <div style={{ minHeight: '100vh' }} className='d-flex justify-content-center align-items-center rounded shadow w-100'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <h1 style={{ fontSize: '80px' }}><i className="fa-brands fa-docker me-2"></i>Project Fair</h1>
              <p style={{ textAlign: 'justify' }}>One stop Destination for all software projects, where user can add and manage their projects. As well as can access all available projects in our website...What are you waiting for !!! </p>
              {
                sessionStorage.getItem("token") ? 
                <Link to={'/dashboard'} className='btn btn-warning'>MANAGE YOUR PROJECTS</Link>
                :
                <Link to={'/login'} className='btn btn-warning'>START TO EXPLORE</Link>
              }
            </div>
            <div className='col-lg-6'>
              <img src={img1} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5 text-center'>
        <h1 className='mb-5'>Explore our Projects</h1>
        <marquee>
          <div className='d-flex'>
            {
              allHomeProjects?.map(project=>(
                <div key={project?.id} className='me-5'>
                  <ProjectCard displayData={project} />
                </div>
              ))
            }
          </div>
        </marquee>
        <button onClick={handleProjects} className='btn btn-link mt-5'>CLICK HERE TO VIEW MORE PROJECTS....</button>
      </div>
      <div className='d-flex justify-content-center align-items-center mt-5 flex-column'>
        <h1>Our Testimonials</h1>
        <div className='d-flex justify-content-evenly align-items-center w-100 mt-3'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
                <img width={"60px"} height={'60px'} className='rounded-circle img-fluid mb-2' src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png" alt="" />
                Max Miller
              </Card.Title>
              <Card.Text>
              <div className='d-flex justify-content-center mb-1'>
                <i className="fa-solid fa-star" style={{color:'#FFD43B'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFD43B'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFD43B'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFD43B'}}></i>
              </div>
              <p style={{textAlign:'justify'}}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus molestiae beatae distinctio sit ex voluptatem enim aliquid at excepturi. Omnis rerum hic dicta reiciendis vel veritatis minima soluta iste amet!
              </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Home