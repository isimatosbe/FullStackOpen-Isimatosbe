const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})
  
test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  
  const titles = response.body.map(r => r.title)
  expect(titles).toContain(
    'Testing Blog 1'
  )
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Testing blog created while testing',
    author: 'Testing',
    url: 'amazon.com',
    likes: 10
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  
  const titles = response.body.map(r => r.title)
  
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain(
    'Testing blog created while testing'
  )
})

test('id property is defined', async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs[0].id).toBeDefined()
})

test('a blog without likes get set to zero likes', async () => {
  const newBlog = {
    title: 'Testing blog created while testing',
    author: 'Testing',
    url: 'amazon.com'
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  
  const blog = response.body.find(blog => blog.title === newBlog.title)
  
  expect(blog.likes).toBe(0)
})

test('a blog without title or ulr gives back error 400', async () => {
  const newBlog_noTitle = {
    author: 'Testing',
    url: 'testing.com'
  }
  await api
    .post('/api/blogs')
    .send(newBlog_noTitle)
    .expect(400)

  const newBlog_noUrl = {
    title: 'Testing blog created while testing',
    author: 'Testing',
  }
  await api
    .post('/api/blogs')
    .send(newBlog_noUrl)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})