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
const lowStockRoutes = require('./routes/lowStock')

const supplyManagementRoutes = require('./routes/SupplyManagementRoutes/SupplyManagementRoutes')
const supplierManagementRoutes = require('./routes/SupplyManagementRoutes/SupplierManagementRoutes')



const app = express()


//middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));
app.use(cookieParser());


//Prabashwara's Apis
app.use('/register', registerRouter);
app.use('/', authRoutes);
app.use('/dashboard', authDashboard);

//Binura's Api
app.use('/inventory', inventoryRoutes);
app.use('/lowStock', lowStockRoutes);
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ Status: true })
})

//Supply Manager Api's
app.use('/supply-management/suppliers', supplierManagementRoutes)
app.use('/supply-management', supplyManagementRoutes)



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

