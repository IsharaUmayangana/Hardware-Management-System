import express from 'express';
import dotenv from 'dotenv';
import { dbConfig } from './utils/dbconfig.js';
import cors from 'cors'
import morgan from 'morgan'
import userRouter from './routes/userRoutes.js';
import salesRouter from './routes/SalesRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 8000
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.status(200).json({message:"Server is up and running"})
})	

app.use('/', userRouter);
app.use('/sale', salesRouter);

dbConfig();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}🚀`);
});
