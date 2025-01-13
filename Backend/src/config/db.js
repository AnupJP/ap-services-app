const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("Connecting MongoDB...", process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000,  // Set timeout to 5 seconds
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
