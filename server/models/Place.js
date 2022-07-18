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
  },
  placeImage: {
    type: String
  },
  placeLon: {
    type: Number
  },
  placeLat: {
    type: Number
  }
});

module.exports = placeSchema;