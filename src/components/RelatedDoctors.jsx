import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom";

export const RelatedDoc = ({docId,speciality})=>{
  const {doctors} = useContext(AppContext);
  const navigate = useNavigate()
  const [reldoc,setRelDoc] = useState([])

  useEffect(() =>{
    if(doctors.length > 0 && speciality){
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDoc(doctorsData)
    }
  },[doctors,docId,speciality])
  return(
    <>
      <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctores to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply Browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {
            reldoc.slice(0,5).map((item,index) =>{
              const {image,name,speciality,_id} = item
              return(
                <>
                  <div onClick={()=> {navigate(`/appintment/${_id}`);scrollTo(0,0)}} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='bg-blue-50' src={image} alt="" />
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
        <button onClick={() => {navigate(`/doctors`),scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>
      </div>
    </>
  )
}