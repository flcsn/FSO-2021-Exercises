const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const user = require('../models/user')

const api = supertest(app)

describe('when creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const initialUser = new User({
      username: 'initialUser',
      passwordHash: await bcrypt.hash('initialPass', 10),
      name: 'initialName'
    })

    await initialUser.save()
  }, 100000)

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'testUser',
      password: 'testPass',
      name: 'testName'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(200)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  }, 100000)

  test('unique usernames are enforced', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'initialUser',
      password: 'testPass',
      name: 'testName'
    }

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  }, 100000)

  test('passwords shorter than 3 characters are rejected', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'testUser',
      password: 'no',
      name: 'testName'
    }

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('must be at least 3 characters long')
    
    const usersAtEnd = await User.find({})
    expect(usersAtStart.length).toBe(usersAtEnd.length)
  })
})