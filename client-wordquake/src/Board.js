import React from 'react'

export const Board = ({boardData, handleSubmit, handleChange, displayInput, word}) => {
  return (
    <div className='wordquake-board-game'>
      <div className='board-container'>
        {boardData.map((rowData, rowIndex) => (
          <div key={rowIndex} className='board-row'>
            {rowData.map((cellData, cellIndex) => (
              <div key={cellIndex} className='board-cell'>
                <div className='board-inner-cell'>
                  {cellData}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {displayInput ? (
            <input
              value={word}
              onChange={handleChange}
              className="word-input-live"
            />
          ) : (
            <input
              value="Times Up!"
              className="word-input-dead"
              readOnly
            />
          )}
          <button className='btn word-submit-btn'>Submit</button>
        </form>
      </div>
    </div>
    
  )
}
