import { assets } from "../assets/assets"
export const Footer = () =>{
  return(
    <>
      <div className="md:mx-10">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm">
          {/* Left section */}
          <div>
            <img className="mb-5 w-40" src={assets.logo} alt="" />
            <p className="w-full md:w-2/3 text-gray-600 leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quisquam harum cupiditate dolorum, minus porro at odit eligendi dolorem atque voluptate quaerat aspernatur, et aut exercitationem! Odit doloremque blanditiis non,consectetur animi aut veniam velit dolorem ea sequi sint tempora .</p>
          </div>
          {/* center section */}
          <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>Home</li>
              <li>About us</li>
              <li>Contact us</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          {/* right section */}
          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>+880 17557 68417</li>
              <li>islamnasir910@gmail.com</li>
            </ul>
          </div>
        </div>
        <div>
          <hr />
          <p className="py-5 text-sm text-center">Copyright 2025 E-DoctorSheba - All Right Reseved.</p>
        </div>
      </div>
    </>
  )
}