// Server Connection

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'research_portal',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Define your routes and API endpoints here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// API endpoint to get users
app.get('/api/users', (req, res) => {
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
