
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'
import { Doctors } from './pages/Doctors'
import { Login } from './pages/Login'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { MyProfile } from './pages/MyProfile'
import { MyAppointment } from './pages/MyAppointment'
import { Appointment } from './pages/Appointment'
import { ApppLayout } from './components/layout/AppLayout'
import { PaymentFailed } from './pages/PaymentFailed'


const router = createBrowserRouter([
  {
    path:'/',
    element:<ApppLayout/>,
    children:[
      {
    path:'/',
    element:<Home/>
  },
  {
    path:'/doctors',
    element:<Doctors/>
  },
  {
    path:'/doctors/:speciality',
    element:<Doctors/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/about',
    element:<About/>
  },
  {
    path:'/contact',
    element:<Contact/>
  },
  {
    path:'/my-profile',
    element:<MyProfile/>
  },
  {
    path:'/my-appintments',
    element:<MyAppointment/>
  },
  {
    path:'/appintment/:docId',
    element:<Appointment/>
  },
  {
    path:'/failed',
    element:<PaymentFailed/>
  },
    ]
  }
  
])

const App =()=> {
  return (
    <>
      
      
       <RouterProvider router={router}></RouterProvider>
      
    </>
  )
}

export default App