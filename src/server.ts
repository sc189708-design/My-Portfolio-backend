import express, { Application } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./config/db";
import contactRoutes from "./routes/contactRouter";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//connect to mongodb
connectDB();

//Routes
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
    res.send('Portfolio Backend is runing')
});

app.listen(PORT, () => {
    console.log('server is runig on Port', PORT)
});