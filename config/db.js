const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoUri');

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDb is connected!');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
