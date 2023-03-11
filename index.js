const express = require('express');

const app = express();

app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile("index.html");
});

app.listen(process.env.PORT || 3000, () => console.log('Calculator available on https://localhost:3000'));