import mongoose from "mongoose"; // Import Mongoose

export const connectDB = async () => {
  try {
    // Replace with your local URI or MongoDB Atlas connection string
    const conn = await mongoose.connect(process.env.MONGODB_URI); 
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

// Call the function to execute the connection

