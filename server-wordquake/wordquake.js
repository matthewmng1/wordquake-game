const fs = require('fs');
const path = require('path');

class WordQuake {
  constructor() {
    this.words = this.readDict();
  }

  readDict = () => {
    const dictPath = path.join(__dirname, 'words.txt');
    const data = fs.readFileSync(dictPath, 'utf-8');
    return data.split('\n').map(word => word.trim());
  }

  makeBoard = () => {
    const board = [];
    const getRandomLetter = () => {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      return alphabet[randomIndex];
    }

    for (let y = 0; y < 5; y++) {
      const row = Array.from({ length: 5 }, () => getRandomLetter());
      board.push(row);
    }
    return board;
  }

  

  checkValidWord = (board, word) => {
    const wordExists = this.words.includes(word);
    const validWord = this.find(board, word.toUpperCase());

    if (wordExists && validWord) {
      return 'ok';
    } else if (wordExists && !validWord) {
      return 'not-on-board';
    } else {
      return 'not-word';
    }
  }

  findFrom = (board, word, y, x, seen) => {    
    if (x > 4 || y > 4) return;

    if (board[y][x] !== word[0]) return false;

    if (seen.some(coord => coord[0] === y && coord[1] === x)) return false;

    if (word.length === 1) return true;

    seen.push([y, x]);
    
    if (y === 0 && this.findFrom(board, word.slice(1), y + 1, x, seen)) return true;
    if (y > 0 && this.findFrom(board, word.slice(1), y - 1, x, seen)) return true;
    if (y < 4 && this.findFrom(board, word.slice(1), y + 1, x, seen)) return true;
    if (y === 4 && this.findFrom(board, word.slice(1), y - 1, x, seen)) return true;

    if (x === 0 && this.findFrom(board, word.slice(1), y, x + 1, seen)) return true;
    if (x > 0 && this.findFrom(board, word.slice(1), y, x -  1, seen)) return true;
    if (x < 4 && this.findFrom(board, word.slice(1), y, x + 1, seen)) return true;
    if (x === 4 && this.findFrom(board, word.slice(1), y, x - 1, seen)) return true;

    // diagonals
    if (y > 0 && x > 0 && this.findFrom(board, word.slice(1), y - 1, x - 1, seen)) return true;
    if (y < 4 && x < 4 && this.findFrom(board, word.slice(1), y + 1, x + 1, seen)) return true;
    if (y < 4 && x > 0 && this.findFrom(board, word.slice(1), y + 1, x - 1, seen)) return true;
    if (y > 0 && x < 4 && this.findFrom(board, word.slice(1), y - 1, x + 1, seen)) return true;

    seen.pop();
}


  find = (board, word) => {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (this.findFrom(board, word, y, x, [])) {
          return true;
        }
      }
    }
    return false;
  }
}

module.exports = WordQuake;