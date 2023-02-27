const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Ganar mundial",
    author: "Enzo Fernandez",
    url: "https://enzo.com",
    likes: 69,
  },
  {
    title: "Como patiar vien",
    author: "Lio Messi",
    url: "https://messirve.com",
    likes: 100,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
}, 100000);

test("blog are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("blog has id property", async () => {
  const blogs = await Blog.find({});
  expect(blogs[0]._id).toBeDefined();
});

test("post a blog", async () => {
  const newBlog = {
    title: "Beckam",
    author: "Papu Gomez",
    url: "https://papugome.com",
    likes: 12,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length + 1);
});

test("post a blog but likes is missing", async () => {
  const newBlog = {
    title: "Beckam",
    author: "Papu Gomez",
    url: "https://papugome.com",
  };

  postedBlog = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(postedBlog.body.likes).toBe(0);
});

test("post a blog but title or url is missing", async () => {
  const newBlog = {
    author: "Papu Gomez",
  };

  postedBlog = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("delete a blog", async () => {
  const blogsAtStart = await blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await blogsInDb()

  expect(blogsAtEnd).toHaveLength(blogsAtStart.length -1);

  const ids = blogsAtEnd.map(r => r.id)

  expect(ids).not.toContain(blogToDelete.id)
});

test("update a blog", async () => {
  const blogToUpdate = await blogsInDb()
  const data = {
    author: "Enzo",
  };

  await api
    .put(`/api/blogs/${blogToUpdate[0].id}`)
    .send(data)
    .expect(200)
    

});

afterAll(async () => {
  await mongoose.connection.close();
});
