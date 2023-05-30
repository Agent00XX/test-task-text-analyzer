import { forwardRef } from 'react'
import './index.scss'

const TextArea = forwardRef(({ text, onChangeText }, ref) => {
  return (
    <textarea
      ref={ref}
      className="text-area"
      placeholder="Paste your text here..."
      value={text}
      onChange={onChangeText}
    />
  )
})

export default TextArea
