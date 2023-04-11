import React, { useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import "../css/AddBlog.css";
import { addBlogPost, editBlogPost,singleBlogPost} from "../services/actions/Actions";
import { useDispatch } from "react-redux";
import {useParams} from 'react-router-dom';


//function to Add blog to localstorage which uses redux data store to save data via redux action
function AddBlog() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getBlogDataFromLocalStorage = () =>{
    const blogData = localStorage.getItem('blogs');
    if(blogData){
      return JSON.parse(blogData);
    }
    else{
      return [];
    }
  }
  



  //defining states for blog attributes like title,blogImage,blogType,blogDescription

  const [blogs,setBlogs] = useState(getBlogDataFromLocalStorage());
  const[title,setTitle] = useState('');
  const[blogImage,setBlogImage] = useState('');
  const[blogType,setBlogType] = useState('');
  const[description,setDescription] = useState('');
 



  //this method called when we submit a form 
  const handleAddBlogSubmit = (e) =>{
    e.preventDefault();
    const unique_id = uuid();
    const id = unique_id.slice(0,8)




  //creating object of blog and store this into localstorage with the help of redux
    let blog = {
      title,
      blogImage,
      blogType,
      description,
      id
    }




    //changing state of attributes of blog
    setBlogs([...blogs,blog]);
    setTitle('');
    setBlogImage('');
    setBlogType('');
    setDescription('');
    navigate('/');





    //triggering action for adding blog post in localstorage
    dispatch(addBlogPost(blog));
  }



  /**
   * Edit blog post logic here.....
   */

   const[edit,isEdit] = useState(false);
   let {id} = useParams();
   const data = dispatch(singleBlogPost(id));
   const post = data.payload.data[0];
 
    
    const handleBlogEdit = (e) =>{
       e.preventDefault();
       let editedPost = {
        title,
        blogImage,
        blogType,
        description,
        id
       }
       dispatch(editBlogPost(id,editedPost));
       navigate('/');
    }
 
   


  
  useEffect(() =>{
    if(id){
      isEdit(true);
      setTitle(post.title);
      setBlogImage(post.blogImage);
      setBlogType(post.blogType);
      setDescription(post.description);
    }
  },[id,post]);
  




  
  return (
    <div className="container-fluid">
      <div className="blog-form">
      <form onSubmit={!edit ? handleAddBlogSubmit : handleBlogEdit}>
        <input type="text" placeholder="Title"  value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <br />
        <input type="url" placeholder="Blog Image"  value={blogImage} onChange={(e)=>setBlogImage(e.target.value)} />
        <br />
        <select name="blog-type" id="blog-type"  value = {blogType} onChange={(e)=>setBlogType(e.target.value)}>
          <option value="category">Category</option>
          <option value="food">Food</option>
          <option value="automobile">Automobile</option>
          <option value="science">Science</option>
          <option value="marketing">Marketing</option>
          <option value="news">News</option>
          <option value="technology">Technology</option>
        </select>
        <br />
        <textarea rows="10" placeholder="Enter your description here" value={description} onChange={(e)=> setDescription(e.target.value)} />
        <br />
        <br />
        <button type="submit" className="button">Post</button>
        <br />
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
