import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from Express.js API endpoint
    axios.get('http://localhost:5000/api/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (

    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
