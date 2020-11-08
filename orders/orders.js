const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const axios = require("axios")

app.use(bodyParser.json());

//Connect to database
const URI = "mongodb+srv://atlasAdmin:1234hello1234@booksservice.rmvgn.mongodb.net/ordersDB?retryWrites=true&w=majority"
mongoose.connect(URI);

require("./Order")
const Order = mongoose.model("Order")

//Create new order
app.post("/order", (req, res)=> {
    var newOrder = {
        //Need to convert 'string' to 'Object Id'
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
        
    }
    var order = new Order(newOrder)
    order.save().then(()=> {
        res.send("Order created with success")
    }).catch((err)=> {
        if (err){
            throw err
        }
    })
})

app.get("/orders", (req, res)=> {
    Order.find().then((books)=> {
        res.json(books)
    }).catch((err)=> {
        if(err){
            throw err
        }
    })
})

//Request to get name instead of ID
app.get("/order/:id", (req, res) => {

    Order.findById(req.params.id).then((order) => {
        if(order){

            axios.get("http://localhost:5555/customer/" + order.CustomerID).then((response) => {
                
                var orderObject = {customerName: response.data.name, bookTitle: ''}

                axios.get("http://localhost:4545/book/" + order.BookID).then((response) => {

                    orderObject.bookTitle = response.data.title
                    res.json(orderObject)
                })

            })
        }else{
            res.send("Invalid Order")
        }
    })

})

app.listen(7777, () => {
    console.log("Up and running - Orders Service")
})