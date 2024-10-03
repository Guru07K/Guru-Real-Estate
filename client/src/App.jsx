import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import CreateList from './pages/CreateList'
import UpdateList from './pages/UpdateList'
import ListDetails from './components/ListDetails'
import Search from './components/Search'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/createlisting' element={<CreateList/>}/>
            <Route path='/updatelist/:listId' element={<UpdateList/>}/>
            <Route path='/listDetails/:listId' element={<ListDetails/>}/>
          </Route>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
   
    </BrowserRouter>
  )
}

export default App