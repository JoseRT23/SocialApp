import React from 'react'
import Feed from '../../components/Feed/Feed'
import Navbar from '../../components/Navbar/Navbar'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'

const Setings = () => {
  return (
      <>
        <Navbar />
        <div className="setingsContainer">
                <div className="profileRightBottom">
                    <Sidebar />
                    <div className="setingsInfo">
                        <h1 className='my-4' >Edita tu Información</h1>
                    </div>
                    <Rightbar />
                </div>
        </div>
        
      </>
  )
}

export default Setings