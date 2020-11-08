//Loaders
const express = require ("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

app.use(bodyParser.json());

//Conect to Database
const URI = "mongodb+srv://atlasAdmin:1234hello1234@booksservice.rmvgn.mongodb.net/customersDB?retryWrites=true&w=majority"
mongoose.connect(URI);

//Load model
require("./Customer")
const Customer = mongoose.model("Customer")

app.post("/customer", (req, res) => {
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        
    }
    //Create new book with recieved attributes
    var customer = new Customer(newCustomer)

    //Save to database
    customer.save().then(()=> {
        res.send("Customer created")
    }).catch((err)=> {
        if (err){
            throw err
        }
    })
})

//List Customers
app.get("/customers", (req, res)=> {
    Customer.find().then((customers)=> {
        res.json(customers)
    }).catch((err)=> {
        if(err){
            throw err
        }
    })
})

//Find customer
app.get("/customer/:id", (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        //If valid search, return customer data
        if (customer) {
            //Book data
            res.json(customer)
        }
        //If invalid search, error
        else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        if (err) {
             throw err;
            }
    })
})

//Delete Customer
app.delete("/customer/:id", (req, res)=>{
    Customer.findByIdAndRemove(req.params.id).then(()=> {
        res.send("Customer deleted with success")
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
})

app.listen("5555", ()=> {
    console.log("Up and running - Customer service")
})