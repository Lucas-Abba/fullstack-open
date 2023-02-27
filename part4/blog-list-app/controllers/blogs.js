const blogsRouter = require("express").Router();
const jwt = require('jsonwebtoken')
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    console.log('token : ', authorization)
    return authorization.replace('Bearer ', '')  
  }  
  return null
}

blogsRouter.get("", async (request, response) => {
  const blogs = await Blog.find({}).populate('author', {username:1, name:1})
  response.json(blogs);
});

blogsRouter.post("", async(request, response, next) => {
  const body = request.body

  if(!body.title || !body.url){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: user.id,
    url: body.url,
    likes: body.likes || 0
  });

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()
  response.json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if(blog.author.toString() === decodedToken.id.toString()) {
    console.log('todo piola, se puede borrar')
  } else {
    return response.status(403).json({ error: `only can delete owner's post` })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter