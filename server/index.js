import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';

import userRoute from './routs/userRoute.js';
import categoryRouter from './routs/categoryRoute.js';
import uploadRouter from './routs/uploadRoute.js';
import subCategoryRouter from './routs/subCategoryRouts.js';
import productRouter from './routs/productRoute.js';
import cartRouter from './routs/cartRoute.js';
import addressRouter from './routs/addressRouter.js';
import orderRouter from './routs/orderRouret.js';

dotenv.config();

const app = express(); 
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
// use json
app.use(express.json()); 
// use cookies
app.use(cookieParser());
// use morgan to see requests in console  
app.use(morgan('dev'));
// use helmet for security and difrent domain
app.use(helmet({ crossOriginResourcePolicy: false }));
// port
const port = process.env.PORT || 8080;

// user routes
app.use('/api/user', userRoute);
// category routes
app.use('/api/category', categoryRouter); 
// sub category routes
app.use('/api/sub-category', subCategoryRouter);
// product routes
app.use('/api/product', productRouter);
//  cart routes
app.use('/api/cart', cartRouter);
// address routes
app.use('/api/address', addressRouter);
// orders routes
app.use('/api/order', orderRouter);
// upload routes
app.use('/api/file', uploadRouter)

// listen to port and start server and connect to database
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
