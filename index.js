const express = require('express');
const fetch = require('node-fetch');
var fs = require("fs");

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
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

app.get('/api/items/search', async (request, response) => {
    console.log('query ', request.query.q);
    console.log('req ', `https://api.mercadolibre.com/sites/MLA/search?q=${request.query.q}`);
    const url =  `https://api.mercadolibre.com/sites/MLA/search?q=${request.query.q}`;

    const fetch_response = await fetch(url);
    const json = await fetch_response.json();
    response.json(json);
});





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});