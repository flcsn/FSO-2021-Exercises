import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  const testUser = 'usernameTest'
  const testBlog = {
    title: 'blogTitleTest',
    author: 'blogAuthorTest',
    url: 'blogUrlTest',
    likes: 5,
    user: {
      username: 'usernameTest',
      name: 'nameTest',
      id: '61a1e7c158b1c263aec0c6ce'
    }
  }

  let component, mockAddLike, mockRemoveBlog

  beforeEach(() => {
    mockAddLike = jest.fn()
    mockRemoveBlog = jest.fn()
    component = render(
      <Blog
        blog={testBlog}
        addLike={mockAddLike}
        removeBlog={mockRemoveBlog}
        user={testUser}
      />
    )
  })

  test('renders only title and author by default', () => {
    expect(component.container).toHaveTextContent(
      'blogTitleTest'
    )
    expect(component.container).toHaveTextContent(
      'blogAuthorTest'
    )
    expect(component.container.querySelector('.toggleableInfo')).not.toBeInTheDocument()
  })

  test('renders url and likes after pressing the button', () => {
    expect(component.container.querySelector('.toggleableInfo')).not.toBeInTheDocument()
    expect(component.container).not.toHaveTextContent(
      'blogUrlTest'
    )

    const showButton = component.getByText('view details')
    fireEvent.click(showButton)

    expect(component.container.querySelector('.toggleableInfo')).toBeInTheDocument()
    expect(component.container).toHaveTextContent(
      'blogUrlTest'
    )
  })

  test('calls the event handler twice if the like button is pressed twice', () => {
    const showButton = component.getByText('view details')
    fireEvent.click(showButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockAddLike.mock.calls).toHaveLength(2)
  })
})