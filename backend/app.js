import express from 'express';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoutes.js'
import mongoose from 'mongoose';
import { errorHandler } from './middlewares/errorMiddleware.js';
/* import Library from './models/library.js'; */
/* import bookRoute from './routes/bookRoutes.js'
import memberRoute from './routes/memberRoutes.js' */

const app = express();
const PORT = 8000; 

//aubasillmsdb
//ILIdD9nYNo8dScGx

//const dbURL = 'mongodb+srv://aubasil07_db_user:aubasillmsdb@cluster-lms.dkphmpr.mongodb.net/?appName=Cluster-LMS';
const dbURL = 'mongodb+srv://aubasil07_db_user:SQivg2Ubz6WyK5iC@workouts.3pnbhs8.mongodb.net/?appName=workouts';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes

app.use('/api/v1/library', authRoute);
/* app.use('/api/v1/book', bookRoute); 
app.use('/api/v1/member', memberRoute);  */

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl} - Route not found`
  });
});

app.use(errorHandler);

async function startServer() {
  try {
    await mongoose.connect(dbURL, {
      serverSelectionTimeoutMS: 5000,   // fail faster if can't connect
    });
    console.log('✅ MongoDB Connected to Atlas');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
}

startServer();
