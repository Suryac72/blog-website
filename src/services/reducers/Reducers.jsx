const blogData = JSON.parse(localStorage.getItem("blogPosts") || "[]");
const intitalState = { posts: blogData };

const reducer = (state = intitalState, action) => {
  switch (action.type) {

    //Add New Blog to Localstorage
    case "ADD_BLOG_POST":
      localStorage.setItem(
        "blogPosts",
        JSON.stringify([...state.posts, action.payload])
      );
      return { ...state, posts: [...state.posts, action.payload] };


    //Delete Blog from Localstorage
    case "REMOVE_BLOG_POST":
      const updatedBlogs = state.posts.filter(
        (blog) => blog.id !== action.payload
      );
      localStorage.setItem("blogPosts", JSON.stringify(updatedBlogs));
      return { ...state, posts: updatedBlogs };


    //Fetch Single blog from Localstorage
    case "SINGLE_BLOG_POST":
      const blog = state.posts.filter((blog) => blog.id === action.payload.id);
      action.payload.data = blog;
      return { ...state };


    //Edit Blog from Localstorage
    case "EDIT_BLOG_POST":
      let blogs = JSON.parse(localStorage.getItem('blogPosts'));
      let index = 0;
      for(let i = 0;i<blogs.length;i++){
        if(blogs[i].id === action.payload.id){
          index = i;
          break;
        }
      }
      let editedBlog = blogs.filter((blog) => blog.id !== action.payload.id)
      editedBlog.splice(index,1,action.payload.data);
      localStorage.setItem("blogPosts",JSON.stringify(editedBlog));
      console.log(JSON.parse(localStorage.getItem("blogPosts")));
      return { ...state,posts:editedBlog};

    default:
      return state;
  }
};

export default reducer;
