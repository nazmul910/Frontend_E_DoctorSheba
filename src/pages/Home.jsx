import { useContext, useEffect, useState } from "react"
import { Banner } from "../components/Banner"
import { Header } from "../components/Header"
import { SpecialityMenu } from "../components/SpecialityMenu"
import { TopDoctors } from "../components/TopDoctors"
import { AppContext } from "../context/AppContext"
import {MoonLoader} from 'react-spinners'



export const Home = () =>{
const [loading, setLoading] = useState(true);
const {doctors} = useContext(AppContext);
  

useEffect(()=>{
  if(doctors.length > 0){
    setLoading(false)
  }
},[doctors])

if (loading) {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <p className="text-gray-500 animate-pulse text-lg">Please wait...</p>
      <MoonLoader
  color="#0086db"
  cssOverride={{}}
  loading
  size={18}
  speedMultiplier={1}
/>
    </div>
  );
}

  return(
    <>  
      <Header/>  
      <SpecialityMenu/> 
      <TopDoctors/>
      <Banner/>  
    </>
  )
}