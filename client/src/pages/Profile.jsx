import {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePreviousAvatar, deleteUserAction, logoutAction, updateProfile, updateProfileimage } from '../Actions/userActions'
import { Link, useNavigate } from 'react-router-dom'
import { deletePreviewList} from '../Actions/listingAction'
import { AiFillDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { getUserDataSuccess } from '../slices/listSlice'
import { Alert, Button, Stack } from '@mui/material'
import Swal from 'sweetalert2'
import Backbutton from '../components/Backbutton'
import { Helmet } from 'react-helmet-async'


const Profile = () => {
  
  const {user,  loading} = useSelector(state => state.authState)
  const {userList} = useSelector(state => state.listState)

  const [userData , setUserData] = useState({
    name : '',
    email : '',
    password : '',
  })
 
  
  const [prevAvatar, setPrevAvatar] = useState(user.avatar.url)
  const [toggle, setToggle] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onchange = async (e) => {
    if (e.target.id === 'avatar_upload') {
        // For Preview purpose
        const reader = new FileReader();
        reader.onload = () => {
            setPrevAvatar(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);

        // Delete previous avatar from Cloudinary
        dispatch(deletePreviousAvatar(user.avatar.public_id))

        // Upload to Cloudinary
        const avatarData = new FormData();
        avatarData.append('file', e.target.files[0]);
        avatarData.append('upload_preset', 'User_profile');
        avatarData.append('folder', 'users/user_profile');
        avatarData.append('cloud_name', 'dygz6jcul');

        await fetch('https://api.cloudinary.com/v1_1/dygz6jcul/image/upload', {
            method: 'POST',
            body: avatarData,
        })
        .then(res => res.json())
        .then(data => dispatch(updateProfileimage(data.url, data.public_id)))

    } else {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  }
 
  const handleDeleteUser = () => {
      
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to Login agin witg this credientials!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteUserAction(user._id))
          sessionStorage.clear('token');
          navigate('/')
          Swal.fire({
            title: "Deleted!",
            text: "Your Account has been deleted.",
            icon: "success"
          });
        }
      });
     
  }
  
  const handleLogoutUser = () => {
   
        Swal.fire({
          title: "Are you sure?",
          text: "You want to log out?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Logout"
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(logoutAction)
            sessionStorage.clear('token');
            navigate('/')
            Swal.fire({
              title: "Loged out!",
              text: "logout successfully.",
              icon: "success"
            })
          }
        })
    
  } 

  const handleDeleteUserList = async (listItemId, userId) => {
   const data = await dispatch(deletePreviewList(listItemId, userId))
   if(data.success === true){
      await fetch(`/api/listing/getuserLists`,{
        method: 'GET',
        headers : {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(data => dispatch( getUserDataSuccess(data)) )
   }
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(updateProfile(userData.name, userData.email, userData.password))
  }

  const fetchUsersList = async() => {
    setToggle(!toggle)
    await fetch(`/api/listing/getuserLists`,{
      method: 'GET',
      headers : {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => dispatch( getUserDataSuccess(data)) )
  }




  return (
    <>
     <Helmet title='Your profile'/>
     <Backbutton/>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex justify-center">
            <label htmlFor="avatar_upload">
              <input
                type="file"
                id="avatar_upload"
                name="avatar"
                hidden
                onChange={onchange}
              />
              <img
                src={prevAvatar}
                className="h-48 w-48 rounded-full cursor-pointer object-cover hover:opacity-40 hover:scale-110"
                alt="profile"
              />
            </label>
          </div>

          <input
            type="text"
            className="border p-3 rounded-lg"
            name="name"
            placeholder={user.name}
            onChange={onchange}
            // value={userData.name}
          />
          <input
            type="email"
            className="border p-3 rounded-lg"
            name="email"
            placeholder={user.email}
            onChange={onchange}
           
          />
          <input
            type="password"
            className="border p-3 rounded-lg"
            name="password"
            placeholder="**********"
            onChange={onchange}
          
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "LOADING..." : "UPDATE"}
          </button>
          <Link
            to={"/createlisting"}
            className="bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 text-center"
          >
            Create Listing
          </Link>
          <div className="flex justify-between">
            <p
              onClick={handleDeleteUser}
              className="text-red-700 cursor-pointer"
            >
              Delete user
            </p>
            <p
              onClick={handleLogoutUser}
              className="text-red-700 cursor-pointer"
            >
              Logout
            </p>
          </div>
        </form>

        {/* show List button */}

        <div className="flex justify-center mt-5">
              <Button variant="contained" onClick={() => fetchUsersList()} >
               Show Your List
             </Button>
        </div>
  
        
     {/* <p className='my-5 text-red-500 text-center'>No listed added yet...</p>} */}
      </div>
    
      {/* Listings */}
      <div>
        {loading && <p>Loading...</p>}
        { 
        toggle && ( userList && userList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            {userList.map((listItem) => (
              user._id === listItem.user &&       
                <div key={listItem._id}  className="p-3 border-2 bg-white  my-5 mx-5 ">
                  <Link to={`/listDetails/${listItem._id}`}>
                    <div>
                        {listItem.images && listItem.images.length > 0 ? (
                          <img
                            src={listItem.images[0].url}
                            alt={listItem.title}
                            className=" hover:scale-110  w-full h-64 object-cover rounded-lg shadow-2xl shadow-gray-950"
                          />
                        ) : (
                          <p>No image available</p>
                        )}
                    </div>

                      <div className="mt-10 flex-col">
                        <h3><span className="text-lg font-semibold ">Title :&nbsp;</span>{listItem.name}</h3>
                        <p className='truncate'><span className="text-lg font-semibold" >Description :&nbsp;</span>{listItem.description}</p>
                        <p><span className="text-lg font-semibold" >Type :&nbsp;</span>{listItem.type}</p>
                      </div>
                    </Link> 
                    
                      <div className="flex justify-between my-5">
                        <button type='button' onClick={() => navigate(`/updatelist/${listItem._id}`)}>
                          <RiEdit2Fill className='h-6 w-14 mt-5 hover:scale-150'></RiEdit2Fill >
                        </button>
                          
                        <button onClick={() => handleDeleteUserList(listItem._id, user._id)}  type='button'>
                          <AiFillDelete className='h-6 w-14 mt-5 hover:scale-150'> </AiFillDelete>
                        </button>
                    </div>
          
                </div>   
            
            ))}
          </div>
        ) : (
              <Stack sx={{ width: '100%', alignItems:'center',marginY:3 }} spacing={2}>
                <Alert severity="warning" sx={{padding:2 }}> List not added yet !</Alert>
              </Stack>
             )
      )  
         
        }
      </div>
    </>
  );
}

export default Profile
