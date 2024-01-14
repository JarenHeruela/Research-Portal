// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const cors = require('cors');

// Create an Express app
const app = express();
const port = 5000;

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_app',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

// Create a simple class for handling CRUD operations
class CrudController {
  // Constructor
  constructor(db) {
    this.db = db;
  }

  // Fetch all items from the database
  getAllItems(req, res) {
    this.db.query('SELECT * FROM items', (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }

  // Insert a new item into the database
  addItem(req, res) {
    const { name } = req.body;
    const sql = 'INSERT INTO items (name) VALUES (?)';
    this.db.query(sql, [name], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Item added successfully', result });
    });
  }

  // Update an existing item in the database
  updateItem(req, res) {
    const { id, name } = req.body;
    const sql = 'UPDATE items SET name = ? WHERE id = ?';
    this.db.query(sql, [name, id], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Item updated successfully', result });
    });
  }

  // Delete an item from the database
  deleteItem(req, res) {
    const id = req.params.id;
    const sql = 'DELETE FROM items WHERE id = ?';
    this.db.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Item deleted successfully', result });
    });
  }
}

// Instantiate the CrudController with the database connection
const crudController = new CrudController(db);

// Middleware to parse JSON data
app.use(cors()); 
app.use(bodyParser.json());

// Define API endpoints
app.get('/api/items', (req, res) => crudController.getAllItems(req, res));
app.post('/api/items', (req, res) => crudController.addItem(req, res));
app.put('/api/items', (req, res) => crudController.updateItem(req, res));
app.delete('/api/items/:id', (req, res) => crudController.deleteItem(req, res));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
