import React from "react";
import "../css/AllBlogs.css";
import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import { useState } from "react";


//creating and exporting LikeContext to send value of likes of posts
export const LikeContext = React.createContext();



const AllBlogs = () =>{

  //fetching posts from states of reducer
  const posts = useSelector((state) => state.posts);

  let likes = [];

  //fetching like values which comes from LikeContext 
  posts.forEach((post) => {likes.push(JSON.parse(localStorage.getItem(`likes-${post.id}`)))});
  const[like] = useState(likes);




  //if any posts not exists
  if(posts.length === 0){
    return <LikeContext.Provider value={{like:like}}> <div className="no-post container"></div> </LikeContext.Provider>
  }
 

  //else
  return (
          <LikeContext.Provider value={{like: like}}>
            <div className="container">
            {
              posts.map((element,index) => (
                <BlogCard className="blogCard" post={element} index={index} />
              ))
            }
          </div>
    </LikeContext.Provider>
  )
}


export default AllBlogs;
