import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import {AppContext} from "../context/AppContext"
import {MoonLoader} from 'react-spinners'

export const Doctors = () =>{
  const {speciality} = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [filterDoc,setFilterDoc] = useState([]);
  const [showFilter,setShowFilter] = useState(false)
  const {doctors} = useContext(AppContext);

  const applyFilter = () =>{

    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setFilterDoc(doctors)
    }
  
  }

  useEffect(()=>{
    if (doctors.length > 0) {
    applyFilter();
    setLoading(false);
  }
  },[doctors,speciality])

if (loading) {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <p className="text-gray-500 animate-pulse text-lg">Loading doctors...</p>
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

  return doctors && (
    <>
      <div>
        <p className="text-gray-600">Browse through the doctors specialist</p>
        <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
          <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={()=> setShowFilter(prev => !prev)}>Filters</button>
          <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' :'hidden sm:flex'}`}>
            <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""} `}>General physician</p>
            <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""} `}>Gynecologist</p>
            <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""} `}>Dermatologist</p>
            <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""} `}>Pediatricians</p>
            <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""} `}>Neurologist</p>
            <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""} `}>Gastroenterologist</p>
          </div>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
              {
              filterDoc.map((item,index) =>{
              const {image,name,speciality,_id} = item
              return(
                <>
                  <div onClick={()=> navigate(`/appintment/${_id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='bg-blue-50 h-[240px] object-cover w-full' src={image} alt="" />
                    <div className='p-4'>
                    
                        {
                          item.available
                          ? <div className="flex items-center gap-2 text-sm text-center"> <p className='w-2 h-2 bg-green-500 rounded-full'></p><p> Available </p> </div>
                          :<div className="flex items-center gap-2 text-sm text-center"><p className='w-2 h-2 bg-gray-600 rounded-full'></p><p className="text-gray-600">Not Available </p> </div>
                        }
                      
                      <p className='text-gray-900 text-lg font-medium'>{name}</p>
                      <p className='text-gray-600 text-sm'>{speciality}</p>
                    </div>
                  </div>
                </>
              )
            })
            }
            </div>
        </div>
      </div>
    </>
  )
}