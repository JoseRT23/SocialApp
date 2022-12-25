import { CameraAlt } from '@mui/icons-material';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Information.css'

const Information = () => {
  const {user, dispatch} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [newInfo, setNewInfo] = useState({
    _id: user._id,
    username: !user.username ? '' : user.username,
    city: !user.city ?  '' : user.city,
    description: !user.description ? '' : user.description,
    from: !user.from ? '' : user.from,
  });

  const handleChange = (e) => {
    setNewInfo({
      ...newInfo,
      [e.target.name] : e.target.value
    })
  }

  const [profilePicture, setProfilePicture] = useState('');
  const [coverPicture, setCoverPicture] = useState('')

  const handleSubmit = async () => {

    if (profilePicture) {
        const data = new FormData();
        const fileNameProfile = Date.now() + profilePicture.name;
        data.append("name", fileNameProfile);
        data.append("file", profilePicture);
        newInfo.profilePicture = fileNameProfile

        try {
            await axios.post("/upload", data);
        } catch (error) {   
            console.log(error);
        }
    }

    if (coverPicture) {
      const data = new FormData();
      const fileNameCover = Date.now() + coverPicture.name;
      data.append("name", fileNameCover);
      data.append("file", coverPicture);
      newInfo.coverPicture = fileNameCover
      
      try {
          await axios.post("/upload", data);
      } catch (error) {   
          console.log(error);
      }
    }

    try {
      await axios.put(`/users/${user._id}`, newInfo);
      dispatch({type:"UPDATE", payload:newInfo});
    } catch (error) {
      console.log(error)
    }



  }

  return (
    <>
        <div className="informationContainer">
            <h1 className='my-4 text-center' >Edita tu Información</h1>
 
            <div className="informationWrapper">

              <div className="informationImages d-flex">

                  <span className="lead">Foto de perfil</span>
                  <div className='containerImgProfile' >
                    <div className='infProfilePicture'>
                      <img className='informationUserImg my-4' 
                            src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"}
                      />
                    </div>

                    <div className='iconCameraProfile'>
                      <label htmlFor="profilePhotoFile">
                        <CameraAlt style={{cursor:'pointer'}} />
                        <input type="file"
                              style={{display:'none'}} 
                              id='profilePhotoFile'
                              onChange={(e) => setProfilePicture(e.target.files[0])} 
                              accept='.png, .jpg, .jpeg' />
                      </label>
                    </div>
                  </div>

                  <span className="lead">Foto de Portada</span>
                  <div className='containerImgCover'>
                    <div className='infCoverPicture'>
                      <img className='informationCoverImg my-4' 
                          src={user.coverPicture ? PF + user.coverPicture : PF+"person/noCover.png"} 
                      />
                    </div>

                    <div className='iconCameraCover'>
                      <label htmlFor="coverPhotoFile">
                        <CameraAlt style={{cursor:'pointer'}} />
                          <input type="file" 
                                style={{display:'none'}} 
                                id='coverPhotoFile'
                                onChange={(e) => setCoverPicture(e.target.files[0])} 
                                accept='.png, .jpg, .jpeg' 
                          />
                      </label>
                    </div>
                  </div>
                  </div>
              </div>
                <div className='px-3'>
                  <label className="form-label lead">Nombres</label>
                  <input className="form-control mb-3" 
                        type="text"
                        name='username'
                        onChange={handleChange} 
                        value={newInfo.username}
                  />
                </div>
                <div className='px-3'>
                  <label className="form-label lead">Ciudad</label>
                  <input className="form-control mb-3" 
                          type="text"
                          name='city'
                          onChange={handleChange} 
                          value={newInfo.city}
                  />
                </div>
                <div className='px-3'>
                  <label className="form-label lead">Presentación</label>
                  <input className="form-control mb-3" 
                          type="text"
                          name='description'
                          onChange={handleChange}  
                          value={newInfo.description}
                  />
                </div>
                <div className='px-3'>
                  <label className="form-label lead">Ciudad de nacimiento</label>
                  <input className="form-control" 
                          type="text"
                          name='from'
                          onChange={handleChange} 
                          value={newInfo.from}
                  />
                <button onClick={handleSubmit} className='saveInformation'>Guardar cambios</button>
                </div>

            </div>


        {/* </div> */}
    </>
  )
}

export default Information