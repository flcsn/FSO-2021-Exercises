import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clearOnSubmit = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    clearOnSubmit
  }
}