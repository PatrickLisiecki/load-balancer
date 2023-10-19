const allServers = [
  "http://localhost:8081/",
  "http://localhost:8082/",
  "http://localhost:8083/",
];

const dynamicServers = [
  "http://localhost:8081/",
  "http://localhost:8082/",
  "http://localhost:8083/",
];

// Implement static load balancing algorithm
// Round robin: distributes the traffic to the load balancers in rotation, each request going to the next backend server in the list. Once the end of the list is reached, it loops back to the first server.
const getServer = () => {
  // Get the first server in the list
  const firstServer = dynamicServers.shift();

  // If server exists
  if (firstServer) {
    // Move the server to the back
    dynamicServers.push(firstServer);

    return firstServer;
  } else {
    // Array was empty
    return null;
  }
};

// Remove a server from the dynamic servers array
// This would be called when a server is unresponsive
const removeServer = (serverURL) => {
  dynamicServers.filter((server) => {
    server !== serverURL;
  });
};

// Add a server to the dynamic servers array
// This would be called when a non-responsive server becomes responsive
const addServer = (serverURL) => {
  if (dynamicServers.find((server) => server === serverURL)) {
    return;
  } else {
    dynamicServers.push(serverURL);
  }
};

const getAllServers = () => {
  return allServers;
};

exports.getServer = getServer;
exports.removeServer = removeServer;
exports.addServer = addServer;
exports.getAllServers = getAllServers;
