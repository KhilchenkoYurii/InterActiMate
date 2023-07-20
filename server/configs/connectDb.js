//const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

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

module.exports = connectDb;
// //READ JSON FILE
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8'),
// );

// //IMPORT DATA IN DATABASE
// const importData = async () => {
//   try {
//     await Tour.create(tours);
//     console.log('Data Imported');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

// //DELETE DATA FROM DATABASE
// const deleteData = async () => {
//   try {
//     await Tour.deleteMany();
//     console.log('Data Deleted');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };
// if (process.env.DATAPROCESS === 'IMPORT') {
//   importData();
// } else if (process.env.DATAPROCESS === 'DELETE') {
//   deleteData();
// }
