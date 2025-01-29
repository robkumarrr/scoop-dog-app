// StAuth10244: I Robert Kumar, 000883986, certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. I have not made
//  my work available to anyone else."

// Database Setup
const sqlite3 = require('sqlite3').verbose();
const file = "database.db";
const db = new sqlite3.Database(file);

db.serialize(function() {

  // Create the Dogs table (overwrite if already exists)
  db.run("DROP TABLE IF EXISTS Dogs"); // Comment out for production
  db.run("CREATE TABLE Dogs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age DOUBLE, owners TEXT, image_path TEXT, potty_markers TEXT)");  // Comment out for production

  // Production
  // db.run("CREATE TABLE IF NOT EXISTS Dogs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age DOUBLE, owners TEXT, image_path TEXT, potty_markers TEXT)"); 

  // Insert seed data for testing
  db.run("INSERT INTO Dogs (name, age, owners, image_path, potty_markers) VALUES (?, ?, ?, ?, ?)", ["Hazel", 1.5, "Bridget and Rob", "https://www.stonedach.com/images/Lara/Lara_1752_2015.jpg", "[]"]);
  db.run("INSERT INTO Dogs (name, age, owners, image_path, potty_markers) VALUES (?, ?, ?, ?, ?)", ["Poppy", 2.3, "Alexandra", "https://i.pinimg.com/474x/76/ea/3f/76ea3fe8370e933d8836e162f33958f4.jpg", "[]"]);


});

module.exports = db;