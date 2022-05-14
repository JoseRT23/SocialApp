import React, { useContext, useEffect, useState } from 'react'
import Share from '../Share/Share'
import './Feed.css'
import axios from 'axios'
import Post from '../Post/Post'
import { AuthContext } from '../../context/AuthContext'


const Feed = ({username}) => {
  const [post, setPost] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      const res = username 
      ? await axios.get(`/profile/${username}`)
      : await axios.get(`/posts/timeline/${user._id}`);

      setPost(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    getPosts();
  }, [username, user._id]);
  

  return (
    <div className='feedContainer'>
      <div className="feedWrapper">
        { (!username || username === user.username) && <Share />}
        {post.map(p => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}

export default Feed