const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  console.log(req);
  res.send("Load balancer is up and running.");
});

app.listen(port, () => {
  console.log(`Load balancer is listening on port ${port}...`);
});
