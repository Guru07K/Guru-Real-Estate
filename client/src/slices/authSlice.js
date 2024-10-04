import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    loading : false,
    error : null,
    user : null,
    isUpdated : false,
    isDeleted: false,
    message : null,

}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        signUpStart(state, action){
            return {
                ...state,
                loading: true
            }
        },
        signUpSuccess(state, action){
            return{
                message: action.payload,
                loading : false
            }
        },
        signUpFail(state, action){
            return{
                loading : false,
                message : null,
                error : action.payload
            }
        },
        loginStart(state, action){
            return {
                ...state,
                loading: true
            }
        },
        loginSuccess(state, action){
            return{
                loading : false,
                isAuthenticated : true,
                user : action.payload.user,
                message: action.payload.message,
            }
        },
        loginFail(state, action){
            return{
                loading : false,
                error : action.payload
            }
        },
        clearError(state, action){
            return{
                ...state,
                error:null
            }
        },
        clearMessage(state, action){
            return{
                ...state,
                message:null
            }
        },
        updateProfileRequest(state, action){
            return{
                ...state,
                message : 'profile updating....',
                loading:true,
            }
        },
        updateProfileSuccess(state, action){
            return{
                ...state,
                loading : false,
                isUpdated: true,
                message : action.payload.message,
                user : action.payload.user
            }
        },
        updateProfileFail(state, action){
            return{
                loading : false,
                isUpdated: false,
                message : null,
                error : action.payload
            }
        },
        deleteUserRequest(state, action){
            return{
                ...state,
                loading:true
            }
        },
        deleteUserSuccess(state, action){
            return{
                loading : false,
                isDeleted: true,
                user : null
            }
        },
        deleteUserFail(state, action){
            return{
                loading : false,
                isDeleted: false,
                error : action.payload
            }
        },
        logOutUserRequest(state, action){
            return{
                ...state,
                loading:true
            }
        },
        logOutUserSuccess(state, action){
            return{
                loading : false,
                error: null,
                user : null,
            }
        },
        logOutUserFail(state, action){
            return{
                loading : false,
                error : action.payload,
                message : null
            }
        },
      
    }

})

export const  {loginStart, loginSuccess, loginFail, logout,
                signUpStart, signUpSuccess, signUpFail,updateProfileRequest,updateProfileSuccess,updateProfileFail,
                deleteUserRequest, deleteUserSuccess, deleteUserFail, logOutUserRequest, logOutUserFail, logOutUserSuccess
                , clearError, clearMessage, 
              } = authSlice.actions;

export default authSlice.reducer;