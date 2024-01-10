const express = require("express");
const WordQuakeGame = require("./wordquake")
const cors = require("cors");
const corsOptions = require('./config')

const app = express();

app.use(cors(corsOptions))
app.use(express.json());

const wordQuakeGame = new WordQuakeGame();

app.get('/', (req, res) => {
  const board = wordQuakeGame.makeBoard();
  res.json({ board }) 
})

app.post('/', (req, res) => {
  const { board, word } = req.body
  const response = wordQuakeGame.checkValidWord(board, word)
  res.json({'result': response})
})

module.exports = app;