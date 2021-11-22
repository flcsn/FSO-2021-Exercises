const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (likes, blog) => likes + blog.likes

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  const reducer = (topBlog, blog) => {
    return topBlog.likes > blog.likes
      ? topBlog
      : blog
  }

  return blogs.reduce(reducer, blogs[0])
}

const mostBlogs = blogs => {
  let set = [...new Set(blogs.map(blog => blog.author))]
  let most = {
    author: "",
    blogs: 0
  }

  set.forEach(author => {
    const filtered = blogs.filter(blog => blog.author === author)
    if (filtered.length > most.blogs) {
      most = {
        author: author,
        blogs: filtered.length
      }
    }
  })

  return most
}

const mostLikes = blogs => {
  let set = [...new Set(blogs.map(blog => blog.author))]
  let most = {
    author: "",
    likes: 0
  }

  set.forEach(author => {
    const filtered = blogs.filter(blog => blog.author === author)
    const countLikes = (sum, blog) => sum + blog.likes
    const likes = filtered.reduce(countLikes, 0)
    const thisAuthor = {
      author: author,
      likes: likes
    }
    
    if (thisAuthor.likes > most.likes)
      most = thisAuthor
  })

  return most
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}