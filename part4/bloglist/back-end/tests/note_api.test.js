const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('HTTP GET request to /api/blogs returns blogs in JSON', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  expect(blogs[0].id).toBeDefined()
})

test('HTTP POST request to /api/blogs creates a new blog post', async () => {
  const newBlog = {
    title: 'test blog',
    author: 'Frankie',
    url: 'fullstackopen.com',
    likes: 0
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogTitles = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(6)
  expect(blogTitles).toContain('test blog')
}, 100000)

test('HTTP POST request with missing likes property will default to 0 likes', async () => {
  const newBlog = {
    title: 'test no likes property',
    author: 'Frankie',
    url: 'fullstackopen.com'
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const addedBlog = response.body.filter(blog => blog.title === 'test no likes property')
  expect(addedBlog[0].likes).toBeDefined
  expect(addedBlog[0].likes).toBe(0)
}, 100000)

test('HTTP POST request with missing title and/or url properties returns status code 400', async () => {
  const newBlog = {
    author: 'Frankie'
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})