import React, { useContext, useRef, useState } from 'react'
import './Share.css'
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const Share = () => {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async e => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            description: desc.current.value
        }
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.image = fileName;
            
            try {
                await axios.post("/upload", data);
            } catch (error) {   
                console.log(error);
            }
        }
        try {   
           await axios.post("/posts", newPost);
           window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='shareContainer'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={user.profilePicture 
                          ? PF + user.profilePicture
                          : PF + "person/noAvatar.png"} 
                     alt="" 
                     className="shareProfileImg" />

                <input placeholder={`Que estas pensando ${user.username}?`} 
                       ref={desc}
                       className="shareInput" />

            </div>
            <hr className="shareHr" />
            {file && (
                <div className="shareImgContainer">
                    {/* crear una url en base a una imagen */}
                    <img className='shareImg' src={URL.createObjectURL(file)} alt="" />
                    <Cancel className='shareCancelImg' onClick={()=>setFile(null)}/>
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor='file' className="shareOption">
                        <PermMedia htmlColor='tomato' className='shareIcon' />
                        <span className="shareOptionText">Foto/Video</span>
                        <input type="file"
                               style={{display:"none"}} 
                               id='file'
                               onChange={(e) => setFile(e.target.files[0])} 
                               accept='.png, .jpeg, .jpg'/>
                    </label>
                    <div className="shareOption">
                        <Label htmlColor='blue' className='shareIcon' />
                        <span className="shareOptionText">Etiqueta</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor='green' className='shareIcon' />
                        <span className="shareOptionText">Ubicación</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                        <span className="shareOptionText">Sentimiento</span>
                    </div>
                </div>
                <button className='shareButton'
                        type='submit'>
                    Compartir
                </button>
            </form>
        </div>
    </div>
  )
}

export default Share