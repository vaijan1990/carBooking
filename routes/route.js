app.get('/', function (req, res) {
  res.send('hello world')
});

app.listen(port, function(){
console.log('App listening on port 3000!');
});
