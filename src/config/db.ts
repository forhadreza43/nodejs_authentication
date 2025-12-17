import mongoose from 'mongoose';

const connectDB = async () => {
   try {
      const uri = process.env.MONGO_URI!;
      const dbName = process.env.MONGO_DB_NAME || 'nodejs_authentication';
      await mongoose.connect(uri, { dbName });
      console.log(`MongoDB connected successfully (db: ${dbName})`);
   } catch (error) {
      console.error('Error connecting to MongoDB:', error);
   }
};

export default connectDB;
