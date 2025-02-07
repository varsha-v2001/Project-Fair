import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectAPI } from '../services/allAPI'


const Projects = () => {
  const [allProjects,setAllProjects]=useState([])
  const [searchKey,setSearchKey]=useState("")
  console.log(allProjects);
  
  useEffect(()=>{
    getAllProjects()
  },[searchKey])


  const getAllProjects=async()=>{
    const token=sessionStorage.getItem('token')
    if (token) {
      const reqHeader={
        "Authorization":`Bearer ${token}`
      }
      try {
        const result=await getAllProjectAPI(searchKey,reqHeader)
        if (result.status==200) {
          setAllProjects(result.data)
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  }

  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px' }} className='container-fluid'>
        <div className='d-flex justify-content-between'>
          <h1>All Projects</h1>
          <input onChange={(e)=>setSearchKey(e.target.value)} placeholder='Search Projects by their languages..' type="text" className='form-control w-25' />
        </div>
        <Row className='mt-3'>
          {
            allProjects?.length>0 ?
            allProjects?.map(project=>(
              <Col className="mb-3" sm={12} md={6} lg={4} >
                <ProjectCard displayData={project} />
              </Col>
            ))
            :
            <div className='text-danger fw-bold fs-2'>Projects not yet uploaded..!!!</div>
          }
        </Row>
      </div>
    </>
  )
}

export default Projects