const { Schema } = require('mongoose');

// This is a subdocument schema,
const hotelSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,

  },
  hotelId: {
    type: String,
  },
  link: {
    type: String
  },
  reviews: {
    type: String
  }
});

module.exports = hotelSchema;