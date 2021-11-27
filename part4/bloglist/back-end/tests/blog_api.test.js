const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

test('HTTP GET request to /api/blogs returns blogs in JSON', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('id property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  expect(blogs[0].id).toBeDefined()
}, 100000)

test('HTTP POST request to /api/blogs fails without logging in', async () => {
  const newBlog = {
    title: 'test blog',
    author: 'Frankie',
    url: 'fullstackopen.com',
    likes: 0
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(401)
}, 100000)

test('HTTP POST request to /api/blogs creates a new blog post', async () => {
  const blogsAtStart = await Blog.find({})
  
  const loginInfo = {
    username: "initialUser",
    password: "initialPass"
  }

  const login = await api.post('/api/login')
    .send(loginInfo)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const token = 'bearer ' + login.body.token

  const newBlog = {
    title: 'test blog',
    author: 'Frankie',
    url: 'fullstackopen.com',
    likes: 0
  }

  await api.post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)

  const blogTitles = blogsAtEnd.map(blog => blog.title)
  expect(blogTitles).toContain('test blog')
}, 100000)

test('HTTP POST request with missing likes property will default to 0 likes', async () => {
  const loginInfo = {
    username: "initialUser",
    password: "initialPass"
  }

  const login = await api.post('/api/login')
    .send(loginInfo)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const token = 'bearer ' + login.body.token
  
  const newBlog = {
    title: 'test no likes property',
    author: 'Frankie',
    url: 'fullstackopen.com'
  }

  await api.post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const addedBlog = response.body.filter(blog => blog.title === 'test no likes property')
  expect(addedBlog[0].likes).toBeDefined
  expect(addedBlog[0].likes).toBe(0)
}, 100000)

test('HTTP POST request with missing title and/or url properties returns status code 400', async () => {
  const loginInfo = {
    username: "initialUser",
    password: "initialPass"
  }

  const login = await api.post('/api/login')
    .send(loginInfo)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const token = 'bearer ' + login.body.token
  
  const newBlog = {
    author: 'Frankie'
  }

  await api.post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(400)
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})