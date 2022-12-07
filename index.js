const express = require("express");
const cors = require("cors");
const GoogleImages = require("google-images");
const mongoose = require('mongoose');
require("dotenv").config();

const { Search } = require('./models');

mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASS}@projects.4t6epta.mongodb.net/?retryWrites=true&w=majority`, {dbName: "imageSearch"});
const client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY);

var app = express();

app.use(cors());

app.use((req, res, next) => { 
    console.log(req.method, req.url, req.params, req.query);
    next()
})

app.get('/', (req, res) => {
    return res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/recent', async (req, res) => {
    let q = await Search.find();
    res.json(q);
})

app.get('/api/search', (req, res) => {
    try {
        let query = req.query["query"];
        let page = req.query["page"] ? Number(req.query["page"]) : 1;

        if (!query) throw "Invalid query parameter.";
        if (req.query["page"] && !page) throw "Invalid page parameter.";

        client.search(query, {page: page})
        .then(images => {
            console.log(images);

            const newSearch = new Search({
                search_query: query,
                time_searched: new Date().toDateString,
            })
            
            newSearch.save()

            return res.json(images);
        })

    } catch (err) {
        if(typeof err != 'string') return res.status(500).json({"error": "Internal Server Error"});
        return res.json({"error": err})
    }
})

app.listen(3000, () => {
    console.log(":3000 Started")
})