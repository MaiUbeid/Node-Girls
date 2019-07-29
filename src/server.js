const http = require('http');
const router = require('./router');

const port = process.env.port || 7000;

const server = http.createServer(router);
server.listen(port, () => {
  console.log(`server listen to http://localhost:${port}`);
});
