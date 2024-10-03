import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {signUpFail, signUpStart, signUpSuccess } from '../slices/authSlice'


const Signup = () => {

  const [userData, setUserData] = useState({
    name : '',
    email : '',
    password : '',
  })
  const [avatar, setAvatar] = useState("")
  const [publicId, setPublicId] = useState("")
  const [uploadLoading, setUploadLoading] = useState(false)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {loading ,error, message} =  useSelector(state => state.authState)
  
  const onChange = async(e) => {
    if (e.target.id === 'avatar') {
      const file = e.target.files[0]
      const avatarData = new FormData();
      avatarData.append('file', file);
      avatarData.append('upload_preset', "User_profile");
      avatarData.append('cloud_name', "dygz6jcul");
      avatarData.append('folder', 'users/user_profile');
    
    setUploadLoading(true)
      await fetch('https://api.cloudinary.com/v1_1/dygz6jcul/image/upload',{
          method: 'POST',
          body: avatarData
        }).then(res => res.json())
          .then(data =>  {
            setPublicId(data.public_id)
            setAvatar(data.url)})
    setUploadLoading(false);

    } else {
      setUserData({ ...userData, [e.target.id]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUpStart())
   
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('avatar', avatar);
    formData.append('publicId', publicId);


    await fetch(`/api/user/register`,{
      method: 'POST',
      body : formData
    })
    .then(res => res.json())
    .then(data => {
      if(data.success == false){
        dispatch(signUpFail(data.message))
        return
      }else{
        dispatch(signUpSuccess())
        navigate('/signin')
      }
    })
    .catch(err => {
        console.log(err)
      })
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-8'>Signup</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input type="text" className='border p-3 rounded-lg  focus:outline-none' placeholder='Username' id='name' value={userData.name} onChange={onChange}/>
        <input type="Email" className='border p-3 rounded-lg  focus:outline-none' placeholder='Email' id='email' value={userData.email} onChange={onChange}/>
        <input type="password" className='border p-3 rounded-lg  focus:outline-none' placeholder='password' id='password' value={userData.password} onChange={onChange}/>
        <input type="file" className='border p-3 rounded-lg  focus:outline-none' id='avatar' onChange={onChange}/>
        <button disabled={uploadLoading} className='bg-slate-700 rounded-lg p-3 text-white hover:opacity-90 disabled:opacity-70'>
          {loading ? 'Loading...' : 'SIGN UP'}
        </button>
       
      </form>

      <div className='flex gap-2 mt-3'>
        <p>Have an account?</p>
        <Link to={'/signin'}>
          <span className='text-blue-700'>Signin</span>
        </Link>
      </div>

      <div>
       {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
      
      

    </div>
  )
}

export default Signup


