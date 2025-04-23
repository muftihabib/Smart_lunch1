

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse JSON
app.use(bodyParser.json());

// MySQL Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Change this as per your MySQL credentials
  password: 'Mufti@0781',  // MySQL password (replace with your password)
  database: 'hostel_feedback',  // Your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Serve the HTML page
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/hostelDetails.html');
// });
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle POST request to submit feedback
app.post('/submit-feedback', (req, res) => {
  const { name, feedback } = req.body;
  if (!feedback) {
    return res.status(400).json({ success: false, message: 'Feedback is required' });
  }
  const sql = 'INSERT INTO feedbacks (name, feedback) VALUES (?, ?)';
  db.query(sql, [name, feedback], (err, result) => {
    if (err) {
      console.error('Error submitting feedback:', err);
      return res.status(500).json({ success: false, message: 'Database Error' });
    }
    console.log('Feedback submitted:', result);
    res.status(200).json({ success: true });
  });
});

// Fetch feedback
app.get('/get-feedback', (req, res) => {
  const query = 'SELECT name, feedback FROM feedbacks ORDER BY created_at DESC'; // Fetch feedbacks from most recent
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching feedback:', err);
      return res.status(500).json({ success: false, message: 'Database Error' });
    }
    res.json({ feedbacks: results });
  });
});


// Handle POST request to submit feedback
app.post('/submit-feedback2', (req, res) => {
  const { name, feedback } = req.body;
  if (!feedback) {
    return res.status(400).json({ success: false, message: 'Feedback is required' });
  }
  const sql = 'INSERT INTO feedbacks2 (name, feedback) VALUES (?, ?)';
  db.query(sql, [name, feedback], (err, result) => {
    if (err) {
      console.error('Error submitting feedback:', err);
      return res.status(500).json({ success: false, message: 'Database Error' });
    }
    console.log('Feedback submitted:', result);
    res.status(200).json({ success: true });
  });
});

// Fetch feedback
app.get('/get-feedback2', (req, res) => {
  const query = 'SELECT name, feedback FROM feedbacks2 ORDER BY created_at DESC'; // Fetch feedbacks from most recent
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching feedback:', err);
      return res.status(500).json({ success: false, message: 'Database Error' });
    }
    res.json({ feedbacks2: results });
  });
});


// Handle POST request to submit feedback
app.post('/submit-feedback3', (req, res) => {
  const { name, feedback } = req.body;
  if (!feedback) {
    return res.status(400).json({ success: false, message: 'Feedback is required' });
  }
  const sql = 'INSERT INTO feedbacks3 (name, feedback) VALUES (?, ?)';
  db.query(sql, [name, feedback], (err, result) => {
    if (err) {
      console.error('Error submitting feedback:', err);
      return res.status(500).json({ success: false, message: 'Database Error' });
    }
    console.log('Feedback submitted:', result);
    res.status(200).json({ success: true });
  });
});

// Fetch feedback
app.get('/get-feedback3', (req, res) => {
  const query = 'SELECT name, feedback FROM feedbacks3 ORDER BY created_at DESC'; // Fetch feedbacks from most recent
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching feedback:', err);
      return res.status(500).json({ success: false, message: 'Database Error' });
    }
    res.json({ feedbacks3: results });
  });
});



// Handle POST request to submit feedback
app.post('/submit-feedback4', (req, res) => {
  const { name, feedback } = req.body;
  if (!feedback) {
    return res.status(400).json({ success: false, message: 'Feedback is required' });
  }
  const sql = 'INSERT INTO feedbacks4 (name, feedback) VALUES (?, ?)';
  db.query(sql, [name, feedback], (err, result) => {
    if (err) {
      console.error('Error submitting feedback:', err);
      return res.status(500).json({ success: false, message: 'Database Error' });
    }
    console.log('Feedback submitted:', result);
    res.status(200).json({ success: true });
  });
});

// Fetch feedback
app.get('/get-feedback4', (req, res) => {
  const query = 'SELECT name, feedback FROM feedbacks4 ORDER BY created_at DESC'; // Fetch feedbacks from most recent
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching feedback:', err);
      return res.status(500).json({ success: false, message: 'Database Error' });
    }
    res.json({ feedbacks4: results });
  });
});





app.get('/hostelDetails.html', (req, res) => {
  res.sendFile(__dirname + '/hostelDetails.html');
});
app.get('/hostelDetails2.html', (req, res) => {
  res.sendFile(__dirname + '/hostelDetails2.html');
});
app.get('/hostelDetails3.html', (req, res) => {
  res.sendFile(__dirname + '/hostelDetails3.html');
});
app.get('/hostelDetails4.html', (req, res) => {
  res.sendFile(__dirname + '/hostelDetails4.html');
});
// app.
// get('/admin', (req, res) => {
//   res.sendFile(__dirname + '/admin.html');
// });
app.get('/lunch', (req, res) => {
  res.sendFile(__dirname + '/admin.html');
});
// login admin
app.get('/adminlogin', (req, res) => {
  res.sendFile(__dirname + '/adminlogin.html');
});
app.get('/verifi.html', (req, res) => {
  res.sendFile(__dirname + '/verifi.html');
});
// Admin page after successful login
// app.get('/adminpage', (req, res) => {
//   res.sendFile(__dirname + '/adminpage.html');
// });















// Handle POST request to submit lunch orders
app.post('/api/order', (req, res) => {
  const { studentId, hostel, orderType, days } = req.body;
  console.log("Received Data:", req.body); // Log received data for debugging

  // Prices for different hostels
  const prices = {
    'Raghuma Hostel': { monday: 10, tuesday: 12, wednesday: 11, thursday: 10, friday: 15 },
    'Royal Paradise': { monday: 9, tuesday: 11, wednesday: 10, thursday: 9, friday: 14 },
    'HMR Hostel': { monday: 8, tuesday: 10, wednesday: 9, thursday: 8, friday: 13 },
    'AB Hostel': { monday: 11, tuesday: 13, wednesday: 12, thursday: 11, friday: 16 }
  };

  // Normalize hostel name to match exactly with the keys in prices object
  const formattedHostel = Object.keys(prices).find(h => h.toLowerCase() === hostel.toLowerCase());

  if (!formattedHostel) {
    console.error("Invalid hostel name received:", hostel);
    return res.status(400).json({ message: "Invalid hostel name" });
  }

  // Calculate total price
  let totalPrice = 0;
  if (orderType === 'daily') {
    totalPrice = prices[formattedHostel][days[0]];
  } else {
    totalPrice = days.reduce((total, day) => total + prices[formattedHostel][day], 0);
  }

  // Prepare SQL query
  const query = `INSERT INTO orders (studentId, hostel, orderType, days, totalPrice) VALUES (?, ?, ?, ?, ?)`;
  const daysString = JSON.stringify(days); // Convert days array to JSON string

  console.log("Storing Order: ", { studentId, formattedHostel, orderType, days, totalPrice });

  // Execute query to insert order
  db.query(query, [studentId, formattedHostel, orderType, daysString, totalPrice], (err, results) => {
    if (err) {
      console.error('Error inserting order into MySQL:', err); // Log the error
      return res.status(500).json({ message: 'Error placing the order', error: err });
    }

    console.log('Order inserted successfully:', results); // Log successful insertion
    res.status(200).json({ message: 'Order placed successfully!', totalPrice });
  });
});


// Fetch lunch orders (optional, just to retrieve order data)
app.get('/get-orders', (req, res) => {
  const query = 'SELECT studentId, hostel, orderType, days, totalPrice FROM orders ORDER BY createdAt DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ success: false, message: 'Database Error' });
    }
    res.json({ orders: results });
  });
});


// API endpoint to get all orders
app.get('/api/orders', (req, res) => {
  const { searchTerm, filterDate } = req.query;

  // Build query based on provided filters
  let query = 'SELECT * FROM orders WHERE 1 = 1';
  
  // Filter by search term (studentId or hostel)
  if (searchTerm) {
    query += ` AND (studentId LIKE '%${searchTerm}%' OR hostel LIKE '%${searchTerm}%')`;
  }

  // Filter by selected date (if provided)
  if (filterDate) {
    query += ` AND DATE(orderDate) = '${filterDate}'`;
  }

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Failed to fetch orders', error: err });
      return;
    }

    res.json(results);  // Return the filtered orders in JSON format
  });
});




app.post('/api/verifications', (req, res) => {
  const { studentId, hostel, day } = req.body;

  const query = 'INSERT INTO verifications (student_id, hostel, day) VALUES (?, ?, ?)';
  db.execute(query, [studentId, hostel, day], (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      return res.status(500).json({ message: 'There was an error placing your order. Please try again.' });
    }
    res.status(200).json({ message: 'Order received and stored successfully!' });
  });
});

// GET endpoint to retrieve verification data
app.get('/api/verifications', (req, res) => {
  const query = 'SELECT * FROM verifications ORDER BY created_at DESC';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error retrieving data from the database:', err);
      return res.status(500).json({ message: 'There was an error retrieving the orders.' });
    }
    res.status(200).json(result);
  });
});

// app.post("/adminlogin", (req, res) => {
//   const { username, password } = req.body;
//   console.log("Attempting login with:", username, password); // Log the data

//   const query = "SELECT * FROM admins WHERE username = ?";
//   db.query(query, [username], (err, results) => {
//       if (err) {
//           console.error("Error fetching data: " + err.stack);
//           return res.status(500).send("An error occurred. Please try again.");
//       }

//       if (results.length > 0) {
//           const user = results[0];
//           console.log("User found:", user);
          
//           // If you're using plain-text passwords:
//           if (password === user.password) {
//               console.log("Login successful!");
//               return res.redirect("/adminpage");
//           } else {
//               console.log("Invalid password.");
//               return res.status(401).send("Invalid username or password.");
//           }
//       } else {
//           console.log("User not found.");
//           return res.status(401).send("Invalid username or password.");
//       }
//   });
// });




app.post('/adminlogin', (req, res) => {
  const { username, password } = req.body;

  // SQL query to check the login credentials
  const query = 'SELECT * FROM admins WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error fetching data: ' + err.stack);
      return res.status(500).send('An error occurred. Please try again.');
    }

    if (results.length > 0) {
      // User found, redirect to the respective admin page
      const adminUsername = results[0].username;
      
      // Redirect to respective admin page based on the username
      if (username === 'City View') {
        res.sendFile(path.join(__dirname, 'City View.html'));
      } else if (username === 'sunset') {
        res.sendFile(path.join(__dirname, 'Sunset.html'));
      } else if (username === 'HMR Hostel') {
        res.sendFile(path.join(__dirname, 'HMR Hostel.html'));
      }else if (username === 'AB Hostel') {
        res.sendFile(path.join(__dirname, 'AB Hostel.html'));
      }else {
        console.log("Invalid password.");
        res.status(401).send("Invalid username or password.");
      }
    } else {
      res.status(401).send('Invalid username or password.');
    }
  });
});
// app.get('/adminpage/cityview', (req, res) => {
//   // Serve the City View admin page with the appropriate data
//   res.sendFile(path.join(__dirname, 'City View.html'));
// });

// // Admin Page for Sunset
// app.get('/adminpage/sunset', (req, res) => {
//   // Serve the Sunset admin page with the appropriate data
//   res.sendFile(path.join(__dirname, 'adminpage.html'));
// });




// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});