var express = require('express');
var mongoose = require('mongoose');
var Student = require('./public/js/student.model');
var MongooseHelper = require('./public/js/mongoose.helper');
var server = express();

var port = process.env.PORT || 8080;

var mongoURI = process.env.MONGOURI || require("./secrets").MONGOURI;
mongoose.connect(mongoURI);

server.use(express.json());   

server.use(express.static(__dirname + '/public'))

server.get('/', function(request, response){
  response.sendFile('index.html', {root: __dirname + '/public/html'});
});

server.post('/submit', function(request, response) {
  var lookUpTable = MongooseHelper.interpretSchema(Student);
  var parsedSchema = {};

  Object.keys(request.body).forEach(element => {
    if(lookUpTable[element]) {
      if(lookUpTable[element].type === "Boolean") {
        parsedSchema[element] = request.body[element].checked;
      }
      else if(lookUpTable[element].type === "Array") {
        parsedSchema[element] = [request.body[element].value];
      }
      else {
        parsedSchema[element] = request.body[element].value;
      }
    }
  });
  console.log(parsedSchema);
  // MongooseHelper.sendStudent(parsedSchema);
  response.send("Done");
});

server.listen(port, function(){
  console.log('Now listening on port', port);
});
