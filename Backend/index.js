require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')



const registerRouter = require('./routes/LoginRegisterDashboard/registerRouter');
const authRoutes = require('./routes/LoginRegisterDashboard/authRoutes');
const authDashboard = require('./routes/LoginRegisterDashboard/authDashboard');
const inventoryRoutes = require('./routes/inventory');


const app = express()


//middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
}));
app.use(cookieParser());


//Prabashwara's Apis
app.use('/register', registerRouter);
app.use('/', authRoutes);
app.use('/dashboard', authDashboard);

//Binura's Api
app.use('/inventory', inventoryRoutes);

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ Status: true })
})













//sanjuka - routes,models
const itemsRouter = require('./routes/items');
const lendedItemsRouter = require('./routes/lendedItems');
const Item = require("./models/Item");
const userItemListRouter = require('./routes/userItemList');

// sanjuka - routes
app.use('/items', itemsRouter); 
app.use('/lendedItems', lendedItemsRouter);
app.use('/userItemList', userItemListRouter);



//Database connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        //Server setup
        app.listen(process.env.PORT, () => {
            console.log('Connected to db and listening to port ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

