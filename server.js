const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const url = "mongodb://janani:CarRentalService9!@ds137191.mlab.com:37191/carrentalservice";
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: false
}));

MongoClient.connect(url, (error, database) => {
  if(error) console.log(error);
  console.log("success");

    database.collection('rentalCars').find({}).toArray((error, result) => {
      console.log(result);
    });
});

app.get('/', function(req, res){
  res.send('Hello world');
});

app.listen(port, function(){
  console.log('Example app listening on port 3000!');
});
