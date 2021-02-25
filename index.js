const express = require('express');
const fetch = require('node-fetch');
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

app.get('/api/items/search', async (request, response) => {
    const productListUrl = `https://api.mercadolibre.com/sites/MLA/search?q=${request.query.q}`;
    const productListResponse = await fetch(productListUrl);
    const productListJson = await productListResponse.json();

    const mostRepeatedCategoryId = calculateMostRepeatedCategory(productListJson.results);

    const categorytUrl = `https://api.mercadolibre.com/categories/${mostRepeatedCategoryId}`;
    const categoryDataResponse = await fetch(categorytUrl);
    const categoryDataJson = await categoryDataResponse.json();


    productListJson['most_repeated_category_data'] = categoryDataJson;

    response.json(productListJson);
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});

function calculateMostRepeatedCategory(results) {

    const categoriesId = calculateRepetitions(results);

    const mostRepeatedCategoryId = calculateMostRepeatedCategoryId(categoriesId);

    return mostRepeatedCategoryId;
}

function calculateRepetitions(results) {
    const categoriesId = {};
    results.map(result => {

        if (!categoriesId[result.category_id]) {
            categoriesId[result.category_id] = 1;

        } else {
            categoriesId[result.category_id]++;
        }
    });

    return categoriesId;
}

function calculateMostRepeatedCategoryId(categoriesId) {

    const values = Object.values(categoriesId);

    let currentMax = -1;
    let iMax = -1;
    for (let i = 0; i < values.length; i++) {
        if (values[i] > currentMax) {
            currentMax = values[i];
            iMax = i;
        }
    }

    const mostRepeatedCategoryId = Object.keys(categoriesId)[iMax];

    return mostRepeatedCategoryId;
}