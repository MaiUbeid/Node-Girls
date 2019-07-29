const http = require('http');
const router = require('./router');

const port = 7000;

const server = http.createServer(router);
server.listen(port, () => {
  console.log(`server listen to http://localhost:${port}`);
});
