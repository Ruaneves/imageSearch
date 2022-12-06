const express = require("express");
const cors = require("cors");
const GoogleImages = require("google-images");

require("dotenv").config();

const client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY);

var app = express();

app.use(cors());

app.use((req, res) => { 
    console.log(req.method, req.url, req.params, req.query)
})

app.get('/', (req, res) => {
    return res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/search/:query', (req, res) => {
})

app.listen(3000, () => {
    console.log(":3000 Started")
})