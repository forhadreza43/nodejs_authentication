import 'dotenv/config';
import app from './src/app';
import connectDB from './src/config/db';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
   try {
      await connectDB();
      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
      });
   } catch (err) {
      console.error('Failed to start the server', err);
      process.exit(1);
   }
};

startServer();


