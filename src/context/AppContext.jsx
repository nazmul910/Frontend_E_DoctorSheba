import { createContext, useEffect, useState } from "react";
import {toast} from 'react-toastify'

import axios from 'axios'
export const AppContext = createContext()

const AppContextProvider = (props) =>{
  const currencySymbol = 'Tk. '
  const backendUrl = import.meta.env.VITE_BACKEND_URI

  const [doctors,setDoctors] = useState([]); // For All doctor information
  const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false) //For login information
  const [userData,setUserData] = useState(false) //For user information
 
  const getDoctorsData = async () =>{
    try {
      const {data} = await axios.get(backendUrl + '/api/doctor/list')
      if(data.success){
        setDoctors(data.doctors)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const loadUserProfileData = async () =>{
    try {
      const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}});

      if(data.success){
        setUserData(data.userData)
        toast.success(data.message) 
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

   const value = {
    doctors,getDoctorsData,
    currencySymbol,
    token,setToken, 
    backendUrl,
    userData,setUserData,
    loadUserProfileData
  }

  useEffect(()=>{
    getDoctorsData()
  },[]);

  useEffect(()=>{
    if(token){
      loadUserProfileData()
    }else{
      setUserData(false)
    }
  },[token])

  return(
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;