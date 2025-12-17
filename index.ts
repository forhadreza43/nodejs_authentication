import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
   cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   })
);
app.use(express.json());

// Routes

// Sample route
app.get('/', (req, res) => {
   res.send('Hello, World!');
});

// Start server
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
