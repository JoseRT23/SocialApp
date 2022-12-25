import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import moment from 'moment'
import 'moment/locale/es';
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

const Post = ({post}) => {
  moment.locale('es');
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user:currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [post.likes, currentUser._id]);
  
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    getUsers();
  }, [post.userId]);

  //Sistema de likes
  const handleLike = () => {
    try {
      axios.put(`/posts/${post._id}/reaction`, {userId:currentUser._id})
    } catch (error) {
      console.log(error)
    }
    setLike(isLiked ? like-1 : like+1);
    setIsLiked(!isLiked);
  }

  return (
    <div className="postContainer">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"}
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{moment(post.createdAt).fromNow()}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
            <span className="postText">{post?.description}</span>
            <img src={PF+post.image} alt="" className="postImg" />
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
                <img className="likeIcon" 
                     src={`${PF}like.png`} 
                     alt="" 
                     onClick={handleLike}/>
                <img className="likeIcon" 
                     src={`${PF}heart.png`}
                     alt="" 
                     onClick={handleLike}/>
                <span className="likeCounter">A {like} personas les gusta esto</span>
            </div>
            <div className="postBottomRight">
                <span className="commentText">{post.comment} comentarios</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
