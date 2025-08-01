import { useContext } from "react"
import {AppContext} from '../context/AppContext'
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import {MoonLoader} from 'react-spinners'



export const MyAppointment = () =>{
  const {backendUrl,token,getDoctorsData} = useContext(AppContext);
  const [appointments,setAppointments] = useState([]);


  const [loading, setLoading] = useState(true);


  const months = [" ","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const slotDateFormat = (slotDate) =>{
    const dateArray = slotDate.split('-')
    return dateArray[0]+ " " + months[Number(dateArray[1])]+" "+dateArray[2]
  }


  const getUserAppointments = async () =>{
    try {
      const {data} = await axios.get(backendUrl + '/api/user/appointments',{headers:{token}});
      setLoading(true)

      if(data.success){
        setAppointments(data.appointments.reverse())
        setLoading(false)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
  }

  const cancelAppointment = async(appointmentId) =>{
    try {
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}});

      if(data.success){
        toast.success(data.message);
        getUserAppointments()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  const appointmentPayment = async (appointmentId) =>{
    try {
      const {data} = await axios.post(backendUrl +'/api/user/online-payment',{appointmentId},{headers:{token}});

      if(data.success){
        console.log('hello Payment');
        console.log(data.url)
          window.location.replace(data.url)
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  useEffect(() =>{
    if(token){
      getUserAppointments()
      
    }
  },[token])

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
      <div>
        <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointments</p>
        {
          appointments.map((item,index) =>{
            return(
              <>
                <div className="grid grid-cols-[1fr_2fr] gap4 sm:flex sm:gap-6 py-2 border-b" key={index}>
                  <div>
                    <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
                  </div>
                  <div className="flex-1 text-sm text-zinc-600">
                    <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                    <p >{item.docData.speciality}</p>
                    <p className="text-zinc-700 font-medium mt-1">Address:</p>
                    <p className="text-xs">{item.docData.address.line1}</p>
                    <p className="text-xs">{item.docData.address.line2}</p>
                    <p className="text-xs mt-1"><span className="text-sm text-neutral-700 font-medium ">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                  </div>
                  <div></div>
                  <div className="flex flex-col gap-2 justify-end">
                    {!item.cancelled && !item.payment && !item.isCompleted &&  <button onClick={() =>appointmentPayment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-500">{item.payment? "Paid" :"Pay Online"}</button> }
                   
                   {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-500">Cancel appointment</button> } 

                    {item.cancelled && !item.isCompleted && <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Appointment Cancelled</button>}

                    {item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>}
                  </div>
                </div>
              </>
            )
          })
        }
      </div>
    </>
  )
}