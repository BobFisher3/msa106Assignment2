//Define book 'class'
const mongoose = require("mongoose");

mongoose.model("Book", {
    //Define attributes
    title: {
        type: String, 
        require: true
    },
    author: {
        type: String,
        require: true
    },
    numberPages: {
        type: Number,
        require: false
    },
    publusher: {
        type: String,
        require: false
    }

});