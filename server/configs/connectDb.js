const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DBPASSWORD);

const connectDb = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
  }
};

//READ JSON FILE
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/defaultUsers.json`, 'utf8'),
);

//IMPORT DATA IN DATABASE
//command in Terminal
// $env:DATAPROCESS="IMPORT"
// nmp start
// after that need to change DATAPROCESS to another value because it will try to IMPORT every npm start
const importData = async () => {
  try {
    await User.create(users);
    console.log('Data Imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE DATA FROM DATABASE
//command in Terminal
// $env:DATAPROCESS="DELETE"
// nmp start
// after that need to change DATAPROCESS to another value because it will try to DELETE every npm start
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('Data Deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.env.DATAPROCESS === 'IMPORT') {
  importData();
} else if (process.env.DATAPROCESS === 'DELETE') {
  deleteData();
}

module.exports = connectDb;
