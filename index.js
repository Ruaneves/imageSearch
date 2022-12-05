const express = require("express");
const cors = require("cors");

var app = express();

app.use(cors())

app.get('/', function(req, res) {
    return res.sendFile(process.cwd() + '/views/index.html');
});

app.listen(3000, () => {
    console.log(":3000 Started")
})