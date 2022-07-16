const { Schema } = require('mongoose');

// This is a subdocument schema,
const placeSchema = new Schema({
  placeId: {
    type: String,
  },
  placeName: {
    type: String,

  },
  placeInfo: {
    type: String,
  },
  placeDescription: {
    type: String
  },
  placeType: {
    type: String
  }
});

module.exports = placeSchema;