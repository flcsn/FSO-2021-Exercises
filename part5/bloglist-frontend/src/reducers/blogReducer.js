import blogService from '../services/blogs'
import { notificationSuccess, notificationFail } from './notificationReducer'

const sortByLikes = (a, b) => {
  if (a.likes > b.likes) return -1
  if (a.likes < b.likes) return 1
  return 0
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS': {
      const blogs = action.data
      const sortedBlogs = blogs.sort(sortByLikes)
      return sortedBlogs
    }
    case 'DELETE_BLOG': {
      const blogIdToDelete = action.data.id
      const blogs = state.filter(b => b.id !== blogIdToDelete)
      const sortedBlogs = blogs.sort(sortByLikes)
      return sortedBlogs
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogsInServer = await blogService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      data: blogsInServer
    })
  }
}

export const setBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    data: blogs
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    let newBlog = null
    try {
      newBlog = await blogService.create(blog)
    } catch (e) {
      console.log(e)
      dispatch(notificationFail(e.message))
      return
    }
    const newBlogs = await blogService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      data: newBlogs
    })
    dispatch(notificationSuccess(`created new blog ${newBlog.title} successfully!`))
  }
}

export const addLike = (blog) => {
  return async dispatch => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    let updatedBlog = null
    try {
      updatedBlog = await blogService.update(likedBlog)
    } catch (e) {
      console.log(e)
      dispatch(notificationFail(e.message))
      return
    }
    const updatedBlogs = await blogService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      data: updatedBlogs
    })
    dispatch(notificationSuccess(`updated blog ${updatedBlog.title} successfully!`))
  }
}

export const deleteBlog = (blog) => {
  return dispatch => {
    blogService.remove(blog)
      .then(dispatch({
        type: 'DELETE_BLOG',
        data: blog
      })).then(
        dispatch(notificationSuccess(`removed blog ${blog.title} successfully!`))
      ).catch(e => {
        dispatch(notificationFail(e.message))
      })
  }
}

export default reducer