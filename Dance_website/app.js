const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://0.0.0.0/contactDance',{useNewUrlParser: true})
const port = 8000 ;
// Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
    address: String
});
var contact = mongoose.model('contact',contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')); // For serving static file
app.use(express.urlencoded());
// EXPRESS SPECIFIC PUG
app.set('view engine','pug');//Set the template engine as pug
app.set('views',path.join(__dirname,"views"));//Set the views directory

// END POINT
app.get('/',(req,res)=>{
    const params = {};
    res.status(200).render('home.pug',params);
});
app.get('/contact',(req,res)=>{
    const params = {};
    res.status(200).render('contact.pug',params);
});
app.post('/contact',(req,res)=>{
    var myData =  new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the Database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the Database")
    });
    // res.status(200).render('contact.pug');
});
//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});