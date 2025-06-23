import {useNavigate} from 'react-router-dom'
export const PaymentFailed = () =>{
  const navigate = useNavigate()

  const handleBacke = () =>{
    navigate('/my-appintments')
  }

  return(

    <>
      <div className='flex justify-center items-center h-screen w-full'>
        <div className='border bg-gray-300 shadow-lg p-8'>
        <p>Payment failed ,try again leter</p>
        <button onClick={handleBacke}>Go back</button>
      </div>
      </div>
    </>
  )
}