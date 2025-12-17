import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

// Middleware
app.use(
   cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/users', userRouter);
app.use('/auth', authRouter);

// Sample route
app.get('/', (req, res) => {
   res.send('Hello, World!');
});

export default app;