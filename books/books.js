//Loaders
const express = require("express");
const app = express();
const bodyParser = require("body-parser"); //Recieve Json data

//Configure BodyParser
app.use(bodyParser.json());

//Load mongoose
const mongoose = require("mongoose");

//Import Book Model
require("./Book")
const Book = mongoose.model("Book")

const URI = "mongodb+srv://atlasAdmin:1234hello1234@booksservice.rmvgn.mongodb.net/booksDB?retryWrites=true&w=majority"
mongoose.connect(URI);

//Post to server
app.get('/', (req, res) => {
    res.send("This is the  main endpoint");
})

//Create function
app.post("/book", (req, res) => {
    //get data from post
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    }
    //Create new book with recieved attributes
    var book = new Book(newBook)
    book.save().then(() => {
        console.log("New book created")
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
    res.send("A new book created with success")
})

//List Books at 'localhost:4545/books'
app.get("/books", (req, res) => {
    Book.find().then((books) => {
        res.json(books)
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
})

//Search
app.get("/book/:id", (req, res) => {
    Book.findById(req.params.id).then((book) => {
        //If valid search, return book data
        if (book) {
            //Book data
            res.json(book)
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

//Delete Function
app.delete("/book/:id", (req, res) => {
    Book.findOneAndRemove(req.params.id).then(() => {
        res.send("book removed with success")
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
})

//Contact books server
app.listen(4545, () => {
    console.log("Up and running! This is the books service");
})

