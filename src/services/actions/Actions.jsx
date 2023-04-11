//actions 
export const addBlogPost = (formData) => ({
  type: 'ADD_BLOG_POST',
  payload: formData
});

export const deleteBlogPost = (id) => ({
   type: 'REMOVE_BLOG_POST',
   payload: id
});

export const editBlogPost = (id,data) => ({
  type: 'EDIT_BLOG_POST',
  payload: {id,data}
})

export const singleBlogPost = (id,data) => ({
  type: 'SINGLE_BLOG_POST',
  payload:{id,data}
})

