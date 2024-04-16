const express = require('express');
const app = express();


app.get('/', (req, res)=>{
    res.status(200).send('Hello from the server side');
});

const port =5000;
app.listen(port, () =>{
    console.log(`App running on port ${port}...`);
});



const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');

// const tempData = fs.readFileSync(`${__dirname}/template/index.html`, 'utf-8');

// const server = http.createServer((req,res) => {
//     const pathname = req.url;
//     if(pathname==='/' || pathname ==='/homepage' || pathname ==='/home'){
//         res.writeHead(200, {'Content-type': 'text/html'});

        
//         res.end(tempData);
//     }
//     else{
//         res.writeHead(404, {
//             'Content-type': 'text/html',
//             'my-own-header': 'hello-world'
//         });
//         res.end('Page not found');
//     }
// });

// server.listen(5000, '127.0.0.1', () => {
//     console.log('Listening to request on port 5000');
// });
function getMimeType(extension) {
    const mimeTypes = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
    };
    return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
  }

const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname; // Extract path from URL
    
    if (pathname==='/' || pathname ==='/homepage' || pathname ==='/home') {
      // Serve HTML file (assuming it's index.html)
      fs.readFile(`${__dirname}/template/index.html`, 'utf-8', (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('404 Not Found');
        } 
        else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } 
    
    else if (pathname.startsWith('/images/')) {
      // Serve image files
      const imageFilePath = path.join(__dirname, pathname); // Construct image path
  
      fs.access(imageFilePath, fs.constants.F_OK, (err) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('404 Not Found');
        } 
        else {
          // Set appropriate content type based on image extension
          const mimeType = getMimeType(pathname.split('.').pop()); // Function to get MIME type
          res.writeHead(200, { 'Content-Type': mimeType });
          fs.createReadStream(imageFilePath).pipe(res); // Stream image data
        }
      });
    } 
    else {
      // Handle other requests (404 Not Found for now)
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404 Not Found');
    }
  });

  server.listen(5000, '127.0.0.1', () => {
  console.log('Listening to request on port 5000');
});
