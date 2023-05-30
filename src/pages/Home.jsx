import { useEffect, useRef, useState } from 'react'

import BottomResultBox from '../components/BottomResultBox'
import Navbar from '../components/Navbar'
import ResultBox from '../components/ResultBox'
import TextArea from '../components/TextArea'
import {
  calculateReadingTime,
  countParagraph,
  countSentences,
  countWords,
  findLongestWord,
  wordCountExcludingCommonWords,
} from '../utils'
import React from 'react'

const App = () => {
  const [text, setText] = useState('')
  const [result, setResult] = useState({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    word_counts: 0,
  })
  const [bottomResult, setBottomResult] = useState({
    readingTime: '-',
    longestWord: '-',
  })

  const textAreaRef = useRef(null)

  const onChangeText = (e) => {
    setText(e.target.value)
  }

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (text.length === 0) {
      setResult({
        words: 0,
        characters: 0,
        sentences: 0,
        paragraphs: 0,
        word_counts: 0,
      })
      setBottomResult({
        readingTime: '-',
        longestWord: '-',
      })
    }

    if (text.length > 0) {
      setResult({
        words: countWords(text),
        characters: text.length,
        sentences: countSentences(text),
        paragraphs: countParagraph(text),
        word_counts: wordCountExcludingCommonWords(text),
      })
      setBottomResult({
        readingTime: calculateReadingTime(text),
        longestWord: findLongestWord(text),
      })
    }
  }, [text])

  return (
    <React.Fragment>
      <Navbar />
      <div className="small-container">
        <div className="main-app">
          <TextArea text={text} onChangeText={onChangeText} ref={textAreaRef} />
          <ResultBox result={result} />
          <BottomResultBox bottomResult={bottomResult} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
