import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import userImg from '../assets/uploadImg.png'
import serverURL from '../services/serverURL'
import { updateUserAPI } from '../services/allAPI'

const Profile = () => {

  const [preview,setPreview]=useState("")
  const [existingProfileImg,setExistingProfileImg]=useState("")
  const [userDetails,setUserDetails]=useState({
    username:"",email:"",password:"",github:"",linkedin:"",profilePic:""
  })
  const [open, setOpen] = useState(false);


  useEffect(()=>{
    if (sessionStorage.getItem('user')) {
      const user=JSON.parse(sessionStorage.getItem('user'))
      setUserDetails({...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin})
      setExistingProfileImg(user.profilePic)
    }
  },[open])

  useEffect(()=>{
    if (userDetails.profilePic) {
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }else{
      setPreview("")
    }
  },[userDetails.profilePic])

  const handleUpdateProfile= async ()=>{
    const {username,email,password,github,linkedin,profilePic}=userDetails
    if (github&&linkedin) {
      const reqBody=new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkein",linkedin)
      preview?reqBody.append("profilePic",profilePic):reqBody.append("profilePic",existingProfileImg)
      const token=sessionStorage.getItem("token")
      if (token) {
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        // make api call
        try {
          const result= await updateUserAPI(reqBody,reqHeader)
          if (result.status==200) {
            alert("Profile updated successfully..!!!")
            sessionStorage.setItem("user",JSON.stringify(result.data))
            setOpen(!open)
          }
        } catch (error) {
          console.log(error);
          
        }
      }
    }else{
      alert('Please fill the form completely...!!')
    }
  }

  return (
    <>
      <div className='d-flex justify-content-evenly'>
        <h3 className='text-warning'>Profile</h3>
        <button onClick={() => setOpen(!open)} className='btn text-warning'><i className='fa-solid fa-angle-down'></i></button>
      </div>
      <Collapse in={open}>
        <div id="row container-fluid align-items-center justify-content-center shadow p-2 rounded">
          <label className='text-center'>
            <input onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} type="file" style={{ display: 'none' }} />
            {
              existingProfileImg==""?
              <img height={'150px'} width={'150px'} className='rounded circle' src={preview?preview:userImg} alt="" />
              :
              <img height={'150px'} width={'150px'} className='rounded circle' src={preview?preview:`${serverURL}/uploads/${existingProfileImg}`} alt="" />
            }
          </label>
          <div className='mb-2 mt-2 w-100'>
                <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} type="text"  placeholder='USER GITHUB PROFILE LINK ' className='form-control'/>
              </div>
              <div className='mb-2 w-100'>
                <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} type="text"  placeholder='USER LINKEDIN PROFILE LINK ' className='form-control'/>
              </div>
              <div className='d-grid w-100'>
                <button onClick={handleUpdateProfile} className='btn btn-warning'>Update Profile</button>
              </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile