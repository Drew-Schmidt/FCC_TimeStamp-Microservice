var express = require('express');
var app = express();

// for remote API testing by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  
// some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Return current time
app.get('/api', (req,res)=>{
  res.json({ 
    unix: Date.now(), 
    utc: new Date().toUTCString() 
  });
})

// Return timestamp from user input
app.get("/api/:date", (req, res) => {

  const input = req.params.date
  let date = new Date(input)
  const unix = date.getTime()

  // Input is unix time
  if (input.search(/^\d+$/g) === 0) {
    date = new Date(Number(input))
    res.json({ 
      unix: Number(input), 
      utc: date.toUTCString() 
    })
  }
    
  // Input format is invalid
  else if (isNaN(Date.parse(input))) {
    res.json({ 
      error: "Invalid Date" 
    })  
  }
    
  // Input is format is acceptable
  else {
    res.json({ 
      unix: Number(unix), 
      utc: date.toUTCString() 
    })
  } 
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
