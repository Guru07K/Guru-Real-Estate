import axios from 'axios'
import { createListFail, createListStart, createListSuccess} from '../slices/listSlice'


// Upload listing image
export const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'User_profile')
    formData.append('cloud_name', 'dygz6jcul')
    formData.append('folder', 'users/listing_images')

    const { data } = await axios.post('https://api.cloudinary.com/v1_1/dygz6jcul/image/upload',formData)
    return { public_id: data.public_id, url : data.url}
  }

//   /api/listing/createlist
export const createList =  (listData, navigate) => async (dispatch)=> {
  dispatch(createListStart())
    await fetch(`/api/listing/createlist`,{
        method: 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(listData)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(createListSuccess(data))
      navigate('/profile')
    })
    .catch(err => dispatch(createListFail(err.message)))
}

// Delete User list
export const deletePreviewList =  (listId, userId) => async (dispatch)=> {
  const res =  await fetch(`/api/listing/deleteuserlist/${listId}`,{
    method: 'DELETE'
  })
  const data = await res.json()
  return data;
  
}

//   /api/listing/createlist
export const updateList =  (listId, listData, navigate, setSelectedFiles) => async (dispatch)=> {

  await fetch(`/api/listing/getListbyId/${listId}`,{
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(listData)
  })
  .then(res => res.json())
  .then(data =>{
    setSelectedFiles(data.list)
     navigate('/profile')})
  .catch(err => dispatch(createListFail(err.message)))
}

// Get listDetails 
export const getUserListDetails = async (listId) => {

    const response = await fetch(`/api/listing/getListbyId/${listId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json(); // Await the response parsing
    return data;

};

// Get user
export const getOwnerDetails = async (userId) => {
  const response = await fetch(`/api/user/getuserbyid/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json()
  return data;
}

// Send email 
export const sendEmailToNodemailer = async (options)=>{
      const res =  await fetch(`/api/listing/sendEmail`,{
         method: 'POST',
         headers : {
           'Content-Type': 'application/json'
         },
         body : JSON.stringify(options)
       })
       const data = await res.json()
       return data;
   
   }