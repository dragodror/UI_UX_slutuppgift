const express = require('express');
const app = express();
var data = require('./data/industrial.json');
const listenPort = 3000;

app.use(express.json());
app.listen(listenPort, () => {
    console.log("Started express on http://localhost:${listenPort}");
});

app.get('/items', (req, res) => {
    res.json(data);
});

app.get('/item/:articleNumber', (req, res) => {
    const { articleNumber } = req.params;
    for (let item of data) {
        if (item.articleNumber === articleNumber) {
            res.json(item);
            return;
        }
    }
    res.status(404).send();
});

app.post('/item', (req, res) => {
    const {name, articleNumber, price, description } = req.body;
    const item = {name, articleNumber, price, description};
    data.push(item);
    console.log("Created item ${articleNumber}");
    res.json(item);
});