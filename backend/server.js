// StAuth10244: I Robert Kumar, 000883986, certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. I have not made
//  my work available to anyone else."

// Express Server
const express = require('express');
const cors = require('cors'); // Instead of using a browser extension
const app = express();
const port = 3000;

// Middleware for getting JSON data and using CORS
app.use(express.json());
app.use(cors());

// SQLite DB
const db = require('./sqlite_db.js');

// Add Dog Endpoint
app.post('/add-dog', function(req, res) {
  db.run('INSERT INTO Dogs (name, age, owners, image_path, potty_markers) VALUES (?, ?, ?, ?, ?)',
   [req.body.name, req.body.age, req.body.owners, req.body.image_path, '[]'], 
   function(error, results) {
    if (error) {
      res.json({status:"failure"}); 
    } else { 
      res.json(results);
    }
   });
});

// Get All Dogs Endpoint
app.get('/get-all-dogs', function(req, res) {
  db.all(
    'SELECT * FROM Dogs',
  function(error, results) {
    if (error) {
      res.json({status:"failure"}); 
    } else { 
      res.json(results);
    }
  });
});

// Update Dog for Potty Coordinates
app.post('/update-dog', function(req, res) {
  db.run(
    "UPDATE Dogs SET potty_markers=? WHERE rowid=?",
    [req.body.potty_markers, req.body.id],
  function(error, results) {
    if (error) {
      res.json({status:"failure"}); 
    } else { 
      res.json(results);
    }
  });
});

// Start Server
const server = app.listen(port, 
  function() {
    console.log(`Server running at http://localhost:${port}/`)
})
