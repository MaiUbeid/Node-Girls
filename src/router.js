const path = require('path');
const fs = require('fs');
const queryString = require('querystring');

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === '/') {
    // console.log(endpoint);
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('<h1>Not Found</h1>');
      } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(file);
      }
    });
  } else if (endpoint.includes('/public')) {
    // console.log(endpoint);
    const path1 = endpoint.split('/');
    const filePath = path.join(__dirname, '..', ...path1);
    const extention = endpoint.split('.').pop();
    const extType = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      jpg: 'image/jpg',
      png: 'image/png',
      ico: 'image/x-icon',
    };
    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('<h1>Not Found</h1>');
      } else {
        response.writeHead(200, { 'Content-Type': extType[extention] });
        response.end(file);
      }
    });
  } else if (endpoint === '/create-post') {
    let allTheData = '';
    request.on('data', (chunkOfData) => {
      allTheData += chunkOfData;
    });
    request.on('end', () => {
      const convertedData = queryString.parse(allTheData);
      // console.log(convertedData);
      const filePath = path.join(__dirname, 'posts.json');
      fs.readFile(filePath, (error, file) => {
        if (error) {
          response.writeHead(500, { 'Content-Type': 'application/javascript' });
          response.end();
        } else {
          const posts = JSON.parse(file);
          const data = convertedData;
          posts[Date.now()] = data.post;
          fs.writeFile(filePath, JSON.stringify(posts), err => console.log(err),);
        }
      });
    });
    response.writeHead(302, { Location: '/' });
    response.end();
  } else if (endpoint === '/posts') {
    const filePath = path.join(__dirname, 'posts.json');
    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(500, { 'Content-Type': 'application/javascript' });
        response.end();
      } else {
        response.writeHead(200, { 'Content-Type': 'applocation/json' });
        response.end(file);
      }
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<h1>Not Found</h1>');
  }
};
module.exports = router;
