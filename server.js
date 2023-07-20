const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
const connectDb = require('./server/configs/connectDb');

dotenv.config({ path: './config.env' });

connectDb();

const port = process.env.PORT || 7000;
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
