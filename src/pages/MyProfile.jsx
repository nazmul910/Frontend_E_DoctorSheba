import { useContext, useState } from "react"
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import {ClipLoader} from 'react-spinners'
export const MyProfile = ()=>{

  const {userData,setUserData,token,backendUrl,loadUserProfileData} = useContext(AppContext)

  const [isLoadin,setIsLoading] = useState(false)
  const [isEdit,setIsEdit] = useState(false);
  const [image,setImage] = useState(false);

  const updateProfileData = async () =>{
    setIsLoading(true)
    try {
      const formData = new FormData();

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)

      image && formData.append('image',image);

      const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}});
      

      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsLoading(false)
        setIsEdit(false)
        setImage(false)
      }else{
        toast.error(data.message)
        setIsLoading(true)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setIsLoading(true)
    }
  }

  return userData && (
    <>
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {
          isEdit
          ? <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img className="w-36 rounded opacity-50 border shadow-2xl" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className="w-10 absolute bottom-12 shadow-2xl right-12" src={image ? '' : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
          :<img className="w-36 rounded" src={userData.image} alt="" />
        }
        {
          isEdit 
          ? <input className="bg-gray-50 border text-3xl font-medium max-w-60 mt-4" type="text" value={userData.name} onChange={(e) => setUserData(prev => ({...prev,name:e.target.value}))} />
          : <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
        }
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div >
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className=" grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email id:</p>
            <p className="text-blue-500">{userData.email}</p>
            <p className="font-medium">Phone:</p>
            {
             isEdit 
              ? <input className="bg-gray-100 max-w-52" type="text" value={userData.phone} onChange={(e) =>    setUserData(prev => ({...prev,phone:e.target.value}))} />
              : <p className="text-blue-400">{userData.phone}</p>
            }
            <p className="font-medium">Address:</p>
            {
              isEdit 
              ? <p className=" space-y-2">
                <input className="bg-gray-100 max-w-52" type="text" value={userData.address.line1} onChange={(e) => setUserData(prev => ({...prev,address:{...prev.address, line1: e.target.value}}))} />
                <br /> 
                <input className="bg-gray-100 max-w-52" type="text" value={userData.address.line2} onChange={(e) => setUserData(prev => ({...prev,address:{...prev.address, line2: e.target.value}}))}/>
              </p>
              : <p className="text-gray-500 space-y-2">
                {userData.address.line1}
                <br /> 
                {userData.address.line2}
              </p>
            }
          </div>
        </div>
        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className=" grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
              {
                isEdit 
                ? <select className="max-w-20 bg-gray-100" value={userData.gender} onChange={(e) => setUserData(prev => ({...prev,gender:e.target.value}))}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                : <p className="text-gray-400">{userData.gender}</p>
              }
              <p className="font-medium">Birthday:</p>
              {
                isEdit
                ? <input className="max-w-20 bg-gray-100" type="date" value={userData.dob} onChange={(e) => setUserData(prev => ({...prev,dob:e.target.value}))}/>
                : <p className="text-gray-400">{userData.dob}</p>
              }
          </div>
        </div>
        <div>
          {
            isEdit
            ? <button className="border flex items-center gap-2 border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500" onClick={updateProfileData}>Save Information {isLoadin ? <ClipLoader size={18} /> : ''}</button>
            : <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500" onClick={()=> setIsEdit(true)}>Edit</button>
          }
        </div>

      </div>
    </>
  )
 
}