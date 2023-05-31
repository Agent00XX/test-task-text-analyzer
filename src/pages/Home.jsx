import { useEffect, useRef, useState } from "react";

import BottomResultBox from "../components/BottomResultBox";
import Navbar from "../components/Navbar";
import ResultBox from "../components/ResultBox";
import {
  calculateReadingTime,
  countParagraph,
  countSentences,
  countWords,
  differentWords,
  findLongestWord,
  wordCountExcludingCommonWords,
} from "../utils";
import React from "react";
import INITIAL_RESULT from "../constants/result";
import INITIAL_BOTTOM_RESULT from "../constants/bottomResult";
import "../Auth.scss";
import axios from "axios";
import { API_URL } from "../utils/AxiosHelper";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from 'dompurify';

const App = () => {
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]);
  const [toggleHistory, setToggleHistory] = useState(false);
  const [result, setResult] = useState(INITIAL_RESULT);
  const [bottomResult, setBottomResult] = useState(INITIAL_BOTTOM_RESULT);
  const [textContent, setTextContent] = useState("")

  const textAreaRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${API_URL}history`);
      data.forEach((data) => delete data.id);
      setHistory(data);
    };
    fetchData();
  }, []);

  const onChangeText = (e) => {
    setText(e);
  };

  const handleClick = async () => {
    if (!text) {
      return;
    }
    try {
      await axios.post(`${API_URL}history`, { text });
      setText("");
      await axios.get(`${API_URL}history`);
      setHistory((oldHistory) => [...oldHistory, { text }]);
      toast.success("Successfully saved to history!");
    } catch (error) {
      toast.success("Something went wrong!");
    }
  };

  useEffect(() => {
    if (text.length === 0) {
      setResult(INITIAL_RESULT);
      setBottomResult(INITIAL_BOTTOM_RESULT);
    }

    if (text.length > 0) {
      setResult({
        words: countWords(text),
        characters: text.length,
        sentences: countSentences(text),
        paragraphs: countParagraph(text),
        word_counts: wordCountExcludingCommonWords(text),
        differentWords: differentWords(text),
      });
      setBottomResult({
        readingTime: calculateReadingTime(text),
        longestWord: findLongestWord(text),
      });
    }
  }, [text]);

  return (
    <div>
      <Navbar />
      <div className="small-container">
        <div className="main-app">
          <CKEditor
            editor={ClassicEditor}
            data={textContent}
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData()
              setTextContent(data);
              const sanitizedText = DOMPurify.sanitize(data, { ALLOWED_TAGS: [] });
              const extractedText = new DOMParser().parseFromString(sanitizedText, 'text/html').documentElement.textContent;
              onChangeText(extractedText)
              const data2 = event
              console.log({ data2 });
            }}
            ref={textAreaRef}
          />
          <ResultBox result={result} />
          <BottomResultBox bottomResult={bottomResult} />
        </div>
        <button
          onClick={handleClick}
          className="btn-submit-form button"
          style={{ margin: "10px" }}
        >
          Clear And Save
        </button>

        <button
          onClick={() => {
            setToggleHistory(!toggleHistory);
          }}
          className="btn-submit-form button"
          style={{ margin: "10px" }}
        >
          {!toggleHistory ? "Load history" : "Close history"}
        </button>
      </div>

      {toggleHistory && (
        <div className="history-container">
          <h1
            style={{ fontSize: "2rem", marginBottom: 10, textAlign: "center" }}
          >
            History
          </h1>
          {history.map(({ text }, index) => (
            <div className="result-bar">
              <div className="result-box" key={index}>
                <span className="box-title">{text}</span>
                <hr />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
