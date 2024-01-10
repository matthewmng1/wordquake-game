import React from 'react'

const Rules = ({ toggleDisplay }) => {
  let content;
  content = (
    <div className='rules-popup-container'>
      <div className='rules-container'>
        <div className='rules-main'>
          <div className='rules-main-header'>
            <div className='header'>WordQuake Rules </div>
            <button onClick={() => toggleDisplay()} className='exit-btn'>Exit</button>
          </div>
          <div className='rules-list'>
            <p>
              Objective: Score as many points as possible in 2 minutes
            </p>
            <ul>
              <li>Words must be 3 letters or longer.</li>
              <li>Words may snake in any direction, including diagonally</li>
              <li>Letters may not be used more than once per word.</li>
              <li>Letters must be touching the previous letter.</li>
            </ul>
            <p>The point values are as follows: </p>
            <ul>
              <li>3-letter word: +1 point</li>
              <li>4-letter word: +2 point</li>
              <li>5-letter word: +3 point</li>
              <li>6-letter word: +4 point</li>
              <li>7-letter word: +5 point</li>
              <li>>8-letter word: +6 point</li>
            </ul>
            </div>
        </div>
      </div>
    </div>
  )
  return content;
}

export default Rules