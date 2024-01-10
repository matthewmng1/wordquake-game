import React from 'react'

const WordList = ({wordList, wordErr, alert}) => {
  return (
    <div>
      <table className='word-list-table'>
        <thead className='word-list-header'>
          <tr>
            <th colSpan={3}
            style={{ color: wordErr === 'error' ? 'red' : (wordErr === 'ok' ? 'springgreen' : 'black') }}
            className='word-list-header-alert'
            >{alert}</th>
          </tr>
          <tr>
            <th colSpan={3} className='word-list-header-title'>Word List</th>
          </tr>
        </thead>
        <tbody className='word-list-body'>
          {wordList.reduce((rows, word, index) => {
            if (index % 3 === 0) {
                rows.push(
                <tr key={index / 3} className='word-row'>
                  <td className='word-cell'>{word.toUpperCase()}</td>
                  {wordList[index + 1] && <td className='word-cell'>{wordList[index + 1].toUpperCase()}</td>}
                  {wordList[index + 2] && <td className='word-cell'>{wordList[index + 2].toUpperCase()}</td>}
                </tr>
                );
              }
          return rows;
        }, [])}
        </tbody>
      </table>
    </div>
  )
}

export default WordList