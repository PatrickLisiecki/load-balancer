// This module is responsible for periodically checking if each backend server is running correctly
const axios = require("axios");
const backendServers = require("./backendServers");

const servers = backendServers.getAllServers();

// Checks if a server is responsive
const isHealthy = async (serverURL) => {
  try {
    // Hit the health endpoint for backend server
    const response = await axios.get(`${serverURL}_health`);

    // Check if server successfuly responds
    return response.status === 200;
  } catch (err) {
    return err;
  }
};

const performHealthChecks = async () => {
  for (const server of servers) {
    const isServerHealthy = await isHealthy(server);
    if (isServerHealthy) {
      console.log(`${server} is healthy.`);
    } else {
      console.log(`${server} is not healthy.`);
    }
  }
};

exports.performHealthChecks = performHealthChecks;
