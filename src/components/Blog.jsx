import React from 'react'
import '../css/BlogCard.css';
import { useDispatch } from 'react-redux';
import { singleBlogPost } from '../services/actions/Actions';
import {useParams} from 'react-router-dom';
import BlogCard from './BlogCard';
import { useState } from 'react';

export const SingleLikeContext = React.createContext();
function Blog() {


  const dispatch = useDispatch();
  let {id} = useParams();
  
  const post = dispatch(singleBlogPost(id));
  let likes = [];



  //fetching like values which comes from LikeContext 

  likes = JSON.parse(localStorage.getItem(`likes-${post.id}`));
  console.log(likes);

  const[like] = useState(false);

  

  return (
    <SingleLikeContext.Provider value={{like:like}}>
    <div className="container">
      <BlogCard post={post.payload.data[0]} index={0}/>
    </div>
    </SingleLikeContext.Provider>
  )
}

export default Blog