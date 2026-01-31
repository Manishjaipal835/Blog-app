const mongoose = require('mongoose');


async function connection() {
  try {
   await mongoose.connect(process.env.url)
   console.log("db is connected")
  } catch (error) {
    console.log('there is an error in connection function',error);
  }
}

module.exports = connection