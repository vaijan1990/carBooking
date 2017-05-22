const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');  
const bodyParser = require('body-parser');
const app = express();
const url = "mongodb://janani:CarRentalService9!@ds137191.mlab.com:37191/carrentalservice";
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: false
}));

let db;

MongoClient.connect(url, (error, database) => {
  if(error) console.log(error);
  console.log("success");
  
  db = database;
  
  app.listen(port, function(){
  console.log('App listening on port 3000!');
});  
  
});

app.get('/rentalCars', (req, res) => {
  db.collection('rentalCars').find({}).toArray((error, results) => {
    res.json(results);
  });
});

app.get('/rentalCars/:id', (req,res) => {
  db.collection('rentalCars').findOne(  { 
      //Have to create a ObjectId from the string in :id
      "_id" : new mongodb.ObjectId(req.params.id) 
    }, (error, result)=> {
      res.json(result);
    });
});
