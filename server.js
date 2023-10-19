const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Server is up and running.");
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}...`);
});