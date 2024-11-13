const id = []
const itemName = [];
const articleNumber = [];
const price = [];
const description = [];

const response = fetch('http://localhost:3000/items')
    .then(response => response.json())
    .then(data => {
        const itemID = Object.keys(data);
        
        console.log("item id is: " + itemID[0]);

        for (let i of itemID) {
            itemName.push(data[i].name);
            articleNumber.push(data[i].articleNumber);
            price.push(data[i].price);
            description.push(data[i].description);

            const myWare = document.getElementById("myWares");

            const myWaresElement = document.createElement("div");
            myWaresElement.id = "waresElement";
            myWaresElement.className = "waresElement"
            myWare.appendChild(myWaresElement);

            let myItemName = document.createElement("p");
            myItemName.id = "name_" + data[i].articleNumber;  
            myItemName.innerHTML = data[i].name;
            myWaresElement.appendChild(myItemName);

            let myArticleNumber = document.createElement("p");
            myArticleNumber.id = "article_" + data[i].articleNumber;
            myArticleNumber.innerHTML = data[i].articleNumber;
            myWaresElement.appendChild(myArticleNumber);

            let myPriceTag = document.createElement("p");
            myPriceTag.id = "price_" + data[i].articleNumber;
            myPriceTag.innerHTML = data[i].price;
            myWaresElement.appendChild(myPriceTag);

            let myDescription = document.createElement("p");
            myDescription.id = "description_" + data[i].articleNumber;
            myDescription.innerHTML = data[i].description;
            myWaresElement.appendChild(myDescription);

            let myItemAmount = document.createElement("input");
            myItemAmount.type = "number";
            myItemAmount.id = "orderID_" + data[i].articleNumber; 
            myWaresElement.appendChild(myItemAmount);
        }
    });

const myButton = document.getElementById("orderButton");
myButton.addEventListener('click', orderWares);

function orderWares(){

    const inputs = document.querySelectorAll("input[type='number']");
    let orderDetails = [];

    inputs.forEach(input =>{
        const itemID = input.id.replace("orderID_", ""); // Get the article number
        const quantity = parseInt(input.value); // Get the quantity

        if (!isNaN(quantity) && quantity > 0) {
            const itemIndex = articleNumber.indexOf(itemID);
            
            const item = {
                name: itemName[itemIndex],
                articleNumber: itemID,
                price: price[itemIndex],
                quantity: quantity
            };

            orderDetails.push(item);
             //Input send to myOrder.json
        }
    });
    fetch('http://localhost:3000/orderWares', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
    })
    console.log(orderDetails);
}
    