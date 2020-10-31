const mongoose = require('mongoose');

// promise
mongoose.Promise = Promise;

/**
 * Mongodb connect
 */
const MongoDBConnect = async () => {
  const dbHost = 'localhost';
  const dbPort = '27017';
  const dbName = 'intranet';
  try {
    await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to mongo!!!');
  } catch (error) {
    console.log('Could not connect to MongoDB', error);
  }
};

exports.MongoDBConnect = MongoDBConnect