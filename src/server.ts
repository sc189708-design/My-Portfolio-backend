import express, { Application } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./config/db";
import contactRoutes from "./routes/contactRouter";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;

const contactLimter = rateLimit ({
    windowMs: 15* 60* 1000,
    max: 5,
    message: {success: false, Error: 'To many request, please try again later.'}
});

app.set('proxy', 1);

//Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
    ? 'https://surajportfolio-woad-kappa.vercel.app'
    : 'http://localhost:5173',
}));
app.use(express.json());
app.use(helmet());

//connect to mongodb
connectDB();

//Routes
app.use('/api/contact', contactLimter, contactRoutes);

app.get('/', (req, res) => {
    res.send('Portfolio Backend is running')
});

app.listen(PORT, () => {
    console.log('server is running on Port', PORT)
});