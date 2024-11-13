const express = require('express');
const app = express();
const path = require('path');
var data = require('./data/industrial.json');
const listenPort = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.listen(listenPort, () => {
    console.log("Started express on http://localhost:${listenPort}");
});

app.get('/', (req, res) => { //Set Start page to index.html
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/items', (req, res) => {
    res.json(data);
});

app.post('/items', (req, res) => {
    const {name, articleNumber, price, description } = req.body;
    const item = {name, articleNumber, price, description};
    data.push(item);
    console.log("Created item ${articleNumber}");
    res.json(item);
});

const fs = require('fs');

app.post('/orderWares', (req, res) =>{
    const orderDetails = req.body;
    console.log("hej order")
    const orderFile = path.join(__dirname, 'data', 'myOrder.json');
    
    fs.readFile(orderFile, (err, data) => {
        let orders = [];
        orders = JSON.parse(data);

        const newOrder = {
            orderID: crypto.randomUUID(),
            items: orderDetails
        };

        orders.push(newOrder);

        fs.writeFile(orderFile, JSON.stringify(orders, null, 2), (err) =>{
            if (err){
                console.error('Error saving order');

            }
            else {
                console.log('Order Saved');
            }
        })
    });
})
