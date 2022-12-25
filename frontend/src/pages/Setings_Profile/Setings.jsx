import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
// import Rightbar from '../../components/Rightbar/Rightbar'
import Information from '../../components/Setings/Information'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Setings.css'

const Setings = () => {
  return (
      <>
        <Navbar />
        <div className="setingsContainer">
            <Sidebar />
            <Information />
            <div className='border'>

            </div>
            {/* <Rightbar onlineUsers={[]} /> */}
        </div>
        
      </>
  )
}

export default Setings