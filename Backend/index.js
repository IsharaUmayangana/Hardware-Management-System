const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const registerRouter = require('./routes/LoginRegisterDashboard/registerRouter');
const authRoutes = require('./routes/LoginRegisterDashboard/authRoutes');
const authDashboard = require('./routes/LoginRegisterDashboard/authDashboard');
const inventoryRoutes = require('./routes/inventory');

//sanjuka - routes,models
const itemsRouter = require('./routes/items');
const lendedItemsRouter = require('./routes/lendedItems');
const Item = require("./models/Item");
const userItemListRouter = require('./routes/userItemList');

const app = express();
const port = process.env.PORT; 

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5174', credentials: true }));
app.use(cookieParser()); 

// Prabashwara's Apis
app.use('/register', registerRouter);
app.use('/', authRoutes);
app.use('/dashboard', authDashboard);

// Binura's Api
app.use('/inventory', inventoryRoutes);

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ Status: true });
});

// sanjuka - routes
app.use('/items', itemsRouter); 
app.use('/lendedItems', lendedItemsRouter);
app.use('/userItemList', userItemListRouter);

// Database connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to db');
    })
    .catch((error) => {
        console.log(error);
    });

app.get('/', (req, res) => {
    res.send('Hello, this is your backend server!');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`); 
});

