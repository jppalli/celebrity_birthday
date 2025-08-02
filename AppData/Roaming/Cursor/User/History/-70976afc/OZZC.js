const httpServer = require('http-server');
const path = require('path');

const server = httpServer.createServer({
  root: path.join(__dirname),
  cache: -1,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 