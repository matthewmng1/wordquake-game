const express = require("express");

const app = require("./app");
const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log(`Started on http://localhost:${PORT}`);
})