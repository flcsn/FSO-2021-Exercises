import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('Blog form', () => {
  let component, mockCreateNewBlog
  beforeEach(() => {
    mockCreateNewBlog = jest.fn()
    component = render(
      <BlogForm createNewBlog={mockCreateNewBlog} />
    )
  })

  test('has empty fields by default', () => {
    const title = component.container.querySelector('#authorField')
    const author = component.container.querySelector('#authorField')
    const url = component.container.querySelector('#urlField')

    expect(title).toHaveTextContent('')
    expect(author).toHaveTextContent('')
    expect(url).toHaveTextContent('')
  })

  test('sends information of input fields if submitted', () => {
    const title = component.container.querySelector('#titleField')
    const author = component.container.querySelector('#authorField')
    const url = component.container.querySelector('#urlField')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'blogTitleTest' }
    })
    fireEvent.change(author, {
      target: { value: 'blogAuthorTest' }
    })
    fireEvent.change(url, {
      target: { value: 'blogUrlTest' }
    })
    fireEvent.submit(form)

    expect(mockCreateNewBlog.mock.calls).toHaveLength(1)
    expect(title.value).toBe('blogTitleTest')
    expect(author.value).toBe('blogAuthorTest')
    expect(url.value).toBe('blogUrlTest')
  })
})