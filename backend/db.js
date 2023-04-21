const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/arpana', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to database successfully');
  } catch (error) {
    console.log('Error connecting to database:', error.message);
  }
};

module.exports = connectDB;
