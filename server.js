const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
const connectDb = require('./server/configs/connectDb');

dotenv.config({ path: './config.env' });
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN...');
  process.exit(1);
});
connectDb();
let server;
const port = process.env.PORT || 7000;
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  server = app.listen(port, () =>
    console.log(`Server running on port ${port}`),
  );
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTED! SHUTTING DOWN...');
  server.close(() => {
    process.exit(1);
  });
});
