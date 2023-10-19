// This module is responsible for periodically checking if each backend server is running correctly

const backendServers = require("./backendServers");

const servers = backendServers.getAllServers();

const performHealthCheck = async () => {
  for (const server in servers) {
  }
};

exports.performHealthCheck = performHealthCheck;
