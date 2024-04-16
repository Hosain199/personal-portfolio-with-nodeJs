const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const express = require('express');
const app = express();



app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './template/home.html'));
});

const port =5000;
app.listen(port, () =>{
    console.log(`App running on port ${port}...`);
});


