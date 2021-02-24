const express = require('express');
var fs = require("fs");

const app = express();
const port = 5000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    fs.readFile("./public/views/index.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
});

app.get('/items', (req, res) => {
    fs.readFile("./public/views/index.html", function (err, data) {
        console.log('search ', req.query.search);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
});

app.get('/items/:id', (req, res) => {
    fs.readFile("./public/views/index.html", function (err, data) {
        console.log('search ', req.params.id);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});