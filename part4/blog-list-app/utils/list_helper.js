const dummy = (blogs) => {
  return(1)
}

const totalLikes = (blogs) => {
  const res = blogs.reduce((acc,curr) => curr.likes + acc, 0)
  return(res)
}

const favoriteBlog = (blogs) => {
  let res = blogs[0]
  if(blogs.length === 1){
    return res
  }
  for(let i=0; i<blogs.length-1; i++){
    res = blogs[i].likes > res.likes ? blogs[i] : res
  }
  return({
    title: res.title,
    author: res.author,
    likes: res.likes
  })
}

const mostBlogs = (blogs) => {
  const blogMap = new Map()
  for(let i of blogs){
    if (blogMap.has(i.author)){
      blogMap.set(i.author, blogMap.get(i.author) + 1)
    } else {
      blogMap.set(i.author, 1)
    }
  }
  const res = [...blogMap.entries()].reduce((a, b ) => b[1] > a[1] ? b : a)
  return({
    author: res[0],
    blogs: res[1]
  })
}

const mostLikes = (blogs) => {
  const blogMap = new Map()
  for(let i of blogs){
    if (blogMap.has(i.author)){
      blogMap.set(i.author, blogMap.get(i.author) + i.likes)
    } else {
      blogMap.set(i.author, i.likes)
    }
  }
  const res = [...blogMap.entries()].reduce((a, b ) => b[1] > a[1] ? b : a)
  return({
    author: res[0],
    likes: res[1]
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}