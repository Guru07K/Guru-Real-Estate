import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error : null,
    message : null,
    loading : false,
    imageUploded : null,
    isListAdded : false,
}

const listSlice = createSlice({
    name : 'List',
    initialState,
    reducers : {
        listImageUploading(state,action){
            return{
                loading : true,
                message : 'Image Uploading...',
                imageUploded : false,
            }
        },
        listImageUploadSuccess(state,action){
            return{
                loading : false,
                message : null,
                imageUploded : true,
            }
        },
        createListStart(state, action){
            return {
                error : null,
                message : null,
               
            }
        },
        createListSuccess(state, action) {
            return{
                ...state,
                message : 'List created successfully',
                isListAdded : true,
            }
        },
        createListFail(state, action){
            return {
                error : action.payload,
                message : null,
            }
        },
        getUserDataRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        getUserDataSuccess(state, action){
            return{
                loading : false,
                userList : action.payload.lists,
                message : action.payload.message,
            }
        },
        deleteUsersList(state, action){
            return{
                ...state,
                message : action.payload.message,
            }
        },

    }
})

export const {listImageUploading, createListFail, createListStart, createListSuccess, listImageUploadSuccess, getUserDataRequest, getUserDataSuccess} = listSlice.actions
export default listSlice.reducer