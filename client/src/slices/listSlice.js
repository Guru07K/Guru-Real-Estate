import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error : null,
    message : null,
    loading : false,
    imageUploded : null,
    imageUploading : false,
}

const listSlice = createSlice({
    name : 'List',
    initialState,
    reducers : {
        listImageUploading(state,action){
            return{
                loading : true,
                imageUploading : true,
                imageUploded : false,
            }
        },
        listImageUploadSuccess(state,action){
            return{
                loading : false,
                message : null,
                imageUploading : false,
                imageUploded : true,
            }
        },
        listImageUploadfail(state,action){
            return{
                loading : false,
                message : null,
                imageUploading : false,
                imageUploded : false,
            }
        },
        createListStart(state, action){
            return {
                loading : true,
                error : null,
                message : null,
            }
        },
        createListSuccess(state, action) {
            return{
                ...state,
                loading : false,
                message : action.payload.message
            }
        },
        createListFail(state, action){
            return {
                loading : false,
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
        clearMessageinListSlice(state, action){
            return{
                ...state,
                message: null
            }
        },
        clearErrorinListSlice(state, action){
            return{
                ...state,
                error: null
            }
        },

    }
})

export const {listImageUploading, createListFail, createListStart, createListSuccess, listImageUploadSuccess, getUserDataRequest, getUserDataSuccess,listImageUploadfail, clearErrorinListSlice, clearMessageinListSlice} = listSlice.actions
export default listSlice.reducer