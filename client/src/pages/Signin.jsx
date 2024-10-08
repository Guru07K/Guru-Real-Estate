import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginFail, loginStart, loginSuccess } from '../slices/authSlice'
import { toast } from 'react-toastify'
import { clearAuthError, clearAuthMessage } from '../Actions/userActions'
import Swal from 'sweetalert2'
import Backbutton from '../components/Backbutton'
import { Helmet } from 'react-helmet-async'


const Signin = () => {

  const [userData, setUserData] = useState({
    email : '',
    password : ''
  }) 

  const {loading, error, message} = useSelector(state => state.authState)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onchange = (e) => {
    setUserData({...userData, [e.target.id] : e.target.value})
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(loginStart()) // for loader purpose
      fetch(`/api/user/signin`,{
            method : 'POST',
            headers : {
              'Content-Type': 'application/json'
            },
            body : JSON.stringify(userData)
          })
          .then(res => res.json())
          .then(data => {
            if(data.success == false){
              dispatch(loginFail(data.message))
              return
            }else{
              dispatch(loginSuccess(data))
              sessionStorage.setItem('token', data.token)
              navigate('/')
            }
          })
    }

    useEffect(()=>{
      if(error){
          toast(error,{  // Toastify
            type:'error',
            position: 'bottom-center',
            hideProgressBar: true,
            autoClose: 3000,
            theme : 'dark',
            onOpen : () => dispatch(clearAuthError)
          })
      }

      if(message){
        const Toast = Swal.mixin({    // SweetAlert2
          toast: true,
          position: "bottom",  
          showConfirmButton: false,
          timer: 3000,
          didOpen: () => dispatch(clearAuthMessage)
        });
        Toast.fire({
          icon: "success",
          title: message,
        });
      }
    
    },[error, message])

  return (
    <>
    <Helmet title="Signin -gur's Estate"/>
    <Backbutton/>
      <div className='max-w-lg p-3 mx-auto'>
        <h1 className='text-center text-3xl font-semibold my-5'>Signin</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <input type="text" className='focus:outline-none p-3 border rounded-lg' placeholder='Email' id='email' onChange={onchange} value={userData.name}/>
          <input type="password" className='focus:outline-none p-3 border rounded-lg' placeholder='password' id='password'  onChange={onchange} value={userData.password}/>
          <button disabled={loading} className='bg-slate-700 p-3 rounded-lg text-white hover:opacity-90'>
          {loading ? 'Loading...' : 'SIGN IN'}
          </button>
        
        
        </form>

        <div className='flex gap-2 mt-4'>
          <p>Dont have an account?</p>
          <Link to="/signup">
            <span className='text-blue-600 '>Signup</span>
          </Link>
        </div>

      </div>
    </>
  )
}

export default Signin