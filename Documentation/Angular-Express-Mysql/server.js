const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'your_database',
});

db.connect();

// Define CRUD operations

// Create
app.post('/api/create', (req, res) => {
  const { name, email } = req.body;
  const INSERT_QUERY = `INSERT INTO users (name, email) VALUES (?, ?)`;
  db.query(INSERT_QUERY, [name, email], (err, result) => {
    if (err) throw err;
    res.send('User added to database');
  });
});

// Read
app.get('/api/users', (req, res) => {
  const SELECT_QUERY = `SELECT * FROM users`;
  db.query(SELECT_QUERY, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Update
app.put('/api/update/:id', (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const UPDATE_QUERY = `UPDATE users SET name=?, email=? WHERE id=?`;
  db.query(UPDATE_QUERY, [name, email, id], (err, result) => {
    if (err) throw err;
    res.send('User updated');
  });
});

// Delete
app.delete('/api/delete/:id', (req, res) => {
  const { id } = req.params;
  const DELETE_QUERY = `DELETE FROM users WHERE id=?`;
  db.query(DELETE_QUERY, [id], (err, result) => {
    if (err) throw err;
    res.send('User deleted');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
