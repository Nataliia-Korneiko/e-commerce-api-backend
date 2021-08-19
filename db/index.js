const mongoose = require('mongoose');

const { DB_CONNECTION } = process.env;

const db = mongoose.connect(DB_CONNECTION, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  dbName: 'db-e-commerce',
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});

mongoose.connection.on('error', (error) => {
  console.log(`Mongoose connection error: ${error.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose is disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB is closed and app is terminated');
    process.exit(1);
  });
});

module.exports = db;
