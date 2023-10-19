const axios = require("axios");
const express = require("express");
const app = express();
const port = 8080;

const backendServers = require("./backendServers");
const healthCheck = require("./healthCheck");

const healthCheckInterval = process.env.HEALTH_CHECK_INTERVAL
  ? +process.env.HEALTH_CHECK_INTERVAL
  : 5;

// Start by doing a health check for each server
healthCheck.performHealthChecks();

// Every health check interval, perform a health check
// Default is 5 seconds
const timer = setInterval(async () => {
  await healthCheck.performHealthChecks();
}, 1000 * healthCheckInterval);

timer.unref();

// Load balancer sends request to backend server
app.get("/", async (req, res) => {
  console.log(req);
  const nextServer = backendServers.getServer();

  // Ensure server exists
  if (nextServer) {
    // Send request to server and return response
    const response = await axios.get(nextServer);
    res.send(response.data);
  } else {
    // Server wasn't found
    res.status(500).send("Server error.");
  }
});

// Listen on port 8080
app.listen(port, () => {
  console.log(`Load balancer is listening on port ${port}...`);
});
