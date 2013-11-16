var https = require('https');
var fs = require('fs');

var stream = fs.createWriteStream("my_radiation.csv");


/*
var Mongoose = require('mongoose');
//var db = Mongoose.createConnection('mongodb://admin:cClWGmEYtA_N@127.0.0.1:27017/test1');
var db = Mongoose.createConnection('localhost', 'mytestapp');
var measurementSchema = Mongoose.Schema({
    date: Date,
    power: Number
});

var Measurement = Mongoose.model('Measurement', measurementSchema);


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to MONGO!");
  
  m1 = new Measurement({
  date: new Date(),
  power: 200
  });
  console.log("Saving");
  m1.save();
  console.log("Done");
  
  Measurement.find(function (err, kittens) {
  console.log("hi");
  console.log(kittens);
});
console.log("found");
});*/



var url = 'https://api.pulseenergy.com/pulse/1/points/66094/data.json?key=FEED0ECF9265369CAE5779C3B22D30F2&interval=day&start'
var date = new Date(2010,10,28,0);
var now = new Date();

function getData() {
  https.get(url + date.toJSON(), function(res) {
    //console.log("Got response: " + res.statusCode);
    
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        var json = JSON.parse(body);
        //console.log("Got response: ", json);
        console.log(json.data[0][0]);
        for (var i = 0; i < json.data.length; i++)
        {
          stream.write(json.data[i][0] + "," + json.data[i][1] + "\n");
        }
        
        date.setTime(date.getTime() + 24*60*60*1000);
        if (date < now)
        {
          setTimeout(getData, 40000);
        } else {
          stream.end();
          }
    }); 
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};



stream.once('open', function(fd) {
  getData();
});