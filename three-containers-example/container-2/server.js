const express = require('express');
const app = express();

const PORT = 8003;

app.get('/', function(req, res) {
    res.json({"container-2": "Hello from Node.js (container-2)! Bulgaria ole."})
})

app.listen(PORT, function() {
    console.log('Your node js server is running on PORT:', PORT);
});

process.on('uncaughtException', function(err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});

