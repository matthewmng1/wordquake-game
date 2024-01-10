import React, { useState, useEffect } from 'react'
import WordQuakeGameApi from './api'
import { Board } from './Board'
import WordList from './WordList'

const WordQuakeGame = () => {
  const [board, setBoard] = useState(
    [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ]
  )
  const [word, setWord] = useState("")
  const [score, setScore] = useState(0)
  const [topScore, setTopScore] = useState(() => {
    const storedTopScore = localStorage.getItem('wordQuakeTopScore');
    return storedTopScore ? parseInt(storedTopScore, 10) : 0;
  });
  const [displayInput, setDisplayInput] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [wordList, setWordList] = useState([])
  const [alert, setAlert] = useState('...')
  const [wordErr, setWordErr] = useState(null)

  /**
   * Fetch a new game board
   */

  const fetchNewBoard = async () => {
    const newBoard = await WordQuakeGameApi.getWordQuakeBoard();
    if(score > topScore){
      setTopScore(score)
      localStorage.setItem('wordQuakeTopScore', score.toString());
      setWordErr('ok')
      setAlert("New Top Score!")
    }
    setScore(0);
    setWordList([])
    setBoard(newBoard.board);
    console.log(board)
    setSeconds(120);
  };

  const handleNewGame = () => {
    fetchNewBoard();
    setDisplayInput(true);
  };

  /**
   * Timer Logic
   */
  

  useEffect(() => {
    if(seconds > 0) {
      let timer;
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds-1);
      }, 1000)
  
      return () => clearInterval(timer);
    } else if(seconds <= 0){
      if(score > topScore){
        setTopScore(score)
        localStorage.setItem('wordQuakeTopScore', score.toString());
        setWordErr('ok')
        setAlert("New Top Score!")
      }
      setDisplayInput(false)
    } 
    
  }, [seconds])

  const formatTime = (timeinSeconds) => {
    const minutes = Math.floor(timeinSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeinSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  /**
   * Handle input logic
   */

  const handleChange = (e) => {
    e.preventDefault();
    const {value} = e.target;
    setWord(value)
  }

  /**
   * Handle Submit logic
   */


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      let wordLength = word.length
      if(wordLength < 3){
        setAlert(`${word} is not long enough!`)
        setWordErr('error')
        setWord("")
        return;
      } else if (wordLength >= 3){
        const isValid = await WordQuakeGameApi.checkValidWord(board, word)
        let result = isValid.result
        if(result === 'not-word' || result === 'not-on-board'){
          setAlert(`"${word}" is not valid.`)
          setWordErr('error')
          setWord("")
        } else if (result === 'ok' && wordList.includes(word)){
          setAlert(`"${word}" already found.`)
          setWordErr('error')
          setWord("")
        } else if (result === 'ok' && wordLength >= 3 && wordLength < 8){
          setWordErr('ok');
          const points = wordLength - 2
          setAlert(`"${word}" +${points}`);
          setScore(score + points);
          setWordList([...wordList, word]);
          setWord("")
        }
      } 
    } catch(err){
      console.log(err)
    }
  }

  let content;
  if(board){
    content = 
    <div className='main-container'>
      <div className='main-header'>
        <h1>Word Quake!</h1>
        <h3>High Score: {topScore} </h3>
      </div>
      <div className='game-container'>
        <div className='wordquake-main'>
          <div className='wordquake-board-container'>
            <div className='wordquake-board-top-div'>
              <div className='new-game'>
                <button onClick={() => { handleNewGame(); }} className='btn new-game-btn'>New Game</button>
              </div>
              <div className='timer'>
                {formatTime(seconds)}
              </div>
              <div className='score'>
                Score: {score}
              </div>
            </div>
            <div>
              <div>
                <Board 
                  boardData={board}
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  displayInput={displayInput}
                  word={word}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='word-list'>
          <WordList
            wordList={wordList}
            wordErr={wordErr}
            alert={alert}
          />
        </div>
      </div>
    </div>
  } 

  return content;
}

export default WordQuakeGame;