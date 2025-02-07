import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadProjectImg from '../assets/uploadProjectImg.png'
import serverURL from '../services/serverURL'
import { updateProjectAPI } from '../services/allAPI'
import { editProjectResponseContext } from '../contexts/ContextApi'

const Edit = ({project}) => {
      const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)

    const [projectDetails,setProjectDetails]=useState({
        id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectPic:""
      })
    console.log(projectDetails);
    const [imageFileStatus,setImageFileStatus]=useState(false)
    const [preview,setPreview]=useState("")


    useEffect(()=>{
        if (projectDetails.projectPic.type=="image/png" || projectDetails.projectPic.type=="image/jpeg" || projectDetails.projectPic.type=="image/jpg") {
          // valid image
          setImageFileStatus(true)
          setPreview(URL.createObjectURL(projectDetails.projectPic))
        } else {
          // invalid image
          setImageFileStatus(false)
          setPreview("")
          setProjectDetails({...projectDetails,projectPic:""})
        }
      },[projectDetails.projectPic])
    


    const [show, setShow] = useState(false);
    const handleClose = () =>{
      setShow(false);
      setProjectDetails({
        id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectPic:""
      })
    } 
    const handleShow = () => {
      setShow(true);
      setProjectDetails({
        id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectPic:""
      })
    }


    const handleUpdateProject=async ()=>{
      const {id,title,languages,overview,github,website,projectPic}=projectDetails
      if (title && languages && overview && github && website){
        // api call- put -(id, updateDetails)
        const reqBody=new FormData()
        reqBody.append("title",title)
        reqBody.append("languages",languages)
        reqBody.append("overview",overview)
        reqBody.append("github",github)
        reqBody.append("website",website)
        preview? reqBody.append("projectPic",projectPic):reqBody.append("projectPic",project.projectPic)
      const token=sessionStorage.getItem("token")
      if (token) {
        // api call
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        try {
          const result=await updateProjectAPI(id,reqBody,reqHeader)
          if (result.status==200) {
            alert('Project updated successfully..!!!')
            setEditProjectResponse(result)
            handleClose()
          }
        } catch (error) {
          console.log(error);
          
        }
      }
      }else{
        alert('Please fill the form completely....!!!')
      }
    }


  return (
    <>
    <button onClick={handleShow} className='btn'><i className='fa-solid fa-edit'></i></button>
     <Modal centered size='lg'  show={show} onHide={handleClose} backdrop="static" keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Project Details...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
          <div className='row align-items-center'>
            <div className='col-lg-4'>
              <label>
                <input onChange={e=>setProjectDetails({...projectDetails,projectPic:e.target.files[0]})} type="file" style={{display:'none'}} />
                <img height={'200px'} className='img-fluid'  src={preview?preview:`${serverURL}/uploads/${project.projectPic}`} alt="" />
              </label>
              {
                !imageFileStatus && <div className='text-warning fw-bolder my-2'>** Upload only the following file types(jpeg, jpg , png) here!!</div>
              }
            </div>
            <div className='col-lg-8'>
              <div className='mb-2'>
                <input value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} type="text"  placeholder='Project Title' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input value={projectDetails.languages} onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})} type="text"  placeholder='Languages used in project' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} type="text"  placeholder='Project Overview' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} type="text"  placeholder='Project Github Link' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} type="text"  placeholder='Project Website Link' className='form-control'/>
              </div>
            </div>
          </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleUpdateProject} variant="primary">Edit</Button>
            </Modal.Footer>
          </Modal>
    </>
  )
}

export default Edit