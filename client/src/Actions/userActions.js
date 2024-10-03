import { deleteUserFail, deleteUserRequest, deleteUserSuccess, logOutUserFail, logOutUserRequest, logOutUserSuccess, updateProfileFail, updateProfileRequest, updateProfileSuccess } from "../slices/authSlice"


// Profile update actions
export const updateProfile = (name, email, password) => async (dispatch) => {
   dispatch(updateProfileRequest()) 
   await fetch(`/api/user/updateProfile`,{
    method:'PUT',
    headers : {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({ name, email, password })
   }) 
    .then(res => res.json())
    .then(data =>{
        console.log(data.user);
        
         dispatch(updateProfileSuccess(data.user))
        })
    .catch(err => dispatch(updateProfileFail(err)))
}

// Delete Previous avatar
export const deletePreviousAvatar = (publicId) => async (dispatch) => {
    await fetch(`/api/user/deletecloud`,{
        method: 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({ public_id: publicId })
    })
}

// Handling separate for image
export const updateProfileimage = (url, publicId) => async (dispatch) => {
 
   dispatch(updateProfileRequest()) 
   await fetch(`/api/user/updateProfile`,{
    method:'PUT',
    headers : {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({ avatar: url, public_id: publicId })
   }) 
    .then(res => res.json())
    .then(data =>{
         dispatch(updateProfileSuccess(data.user))
        })
    .catch(err => dispatch(updateProfileFail(err)))
}

//  Delete User
export const deleteUserAction = (userId) => async(dispatch) =>{
    dispatch(deleteUserRequest())
    const res = await fetch(`/api/user/delete/${userId}`,{
                    method: 'DELETE'
                })

    const data = await res.json() 
    if(!data.success){
        dispatch(deleteUserFail(data.message))
        return
    }
    dispatch(deleteUserSuccess())
    return data;           
    
}

// Logout actions
export const logoutAction = async (dispatch) => {
    dispatch(logOutUserRequest())
    await fetch(`/api/user/logout`)
          .then(response => response.json())
          .then(data => dispatch(logOutUserSuccess()))
          .catch(err => dispatch(logOutUserFail(err.message)))
}

