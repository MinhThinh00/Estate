import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import listingRoute from './routes/listing.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Thay đổi thành miền của ứng dụng của bạn
  credentials: true // Cho phép gửi cookie
}));
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/listing',listingRoute)
