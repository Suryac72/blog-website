import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../css/BlogCard.css";
import { deleteBlogPost } from "../services/actions/Actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import { LikeContext } from "./AllBlogs";
import { useContext } from "react";


const BlogCard = (props) => {
  const dispatch = useDispatch();
  const { post,index} = props;
  const navigate = useNavigate();
  let storedLikes = JSON.parse(localStorage.getItem(`likes-${post.id}`) || '[]');
  const [likes,setLikes] = useState(storedLikes || []);
  const like = useContext(LikeContext);
  
  const [likeValue,setLikeValue] = useState(false);

  //Method/function for display blog of specific id on UI
  const display = (e) => {
    navigate(`/blog/${e}`);
  };



  //function for deleting specific blog post on click
  const handleDelete = (id) => {
    dispatch(deleteBlogPost(id));
  };




  //function for editing specific blog post on click
  const handleEdit = (id) => {
    navigate(`/blog/edit/${id}`);
  };
  


  //function for set like on blog post on click
  const handleLikes = (id) => {
    let like = JSON.parse(localStorage.getItem(`likes-${post.id}`)||'{}');
    if(Object.keys(like).length === 0 || like[post.id] === false){
      let li = {[id]:true};
      setLikes(li);
    }else{
      let li = {[id]:false};
      setLikes(li);
    }
   
  }
  
  console.log(likeValue);
  useEffect(()=>{
      localStorage.setItem(`likes-${post.id}`,JSON.stringify(likes)); 
  },[likes,post.id,like,index])

  return (
        <>
          <div className="card">
          <div className="card__header">
            <img id="card"
              src={post.blogImage}
              alt="card__image"
              className="card__image"
              width="600"
            />
          </div>
          <div className="card__body">
            <span className="tag tag-blue">{post.blogType}</span>
            <h4 className="blog-heading" onClick={() => display(post.id)}>
              {post.title}
            </h4>
            <p>{post.description}</p>
          </div>
          <div className="card__footer">
            <div className="user">
              <img
                src="https://i.pravatar.cc/40?img=1"
                alt="user__image"
                className="user__image"
              />
              <div className="user__info">
                <h5>Jane Doe</h5>
                <small>2h ago</small>
              </div>
              <div className="edit">
                <FontAwesomeIcon
                  onClick={() => {
                    handleEdit(post.id);
                  }}
                  icon={faEdit}
                />
              </div>
              <div className="delete">
                <FontAwesomeIcon
                  onClick={() => {
                    handleDelete(post.id);
                  }}
                  icon={faTrash}
                />
              </div>
              <div className="like">
                <FontAwesomeIcon onClick={() =>{handleLikes(post.id); likeValue === true ?setLikeValue(false): setLikeValue(true)}} icon={faHeart} style={{ color:likeValue? 'red': 'grey'}} />
              </div>
            </div>
          </div>
        </div>
      </>
  );
};


export default BlogCard;
