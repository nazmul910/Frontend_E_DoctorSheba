import { Outlet } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { Navbar } from "../Navbar"
import { Footer } from "../Footer"

export const ApppLayout = () =>{
  return(
    <>
      <div className="mx-4 sm:mx-[10%]">
        <ToastContainer/>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    </>
  )
} 