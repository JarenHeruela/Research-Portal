// Server Connection

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

// Create an Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'research_portal',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ====================================================== //
// API endpoint to GET USERS
app.get('/api/users', (req, res) => {
    // sql query
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(results);
      }
    });
  });

// API endpoint to CREATE USERS

// API endpoint to UPDATE USERS
// API endpoint to DELETE USERS
