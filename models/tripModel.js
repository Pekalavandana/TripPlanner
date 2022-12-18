const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
  destination: String,
  nextTrip: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
    },
  ],
  duration: Number,
  typeOfTrip: String,
});

module.exports = mongoose.model('Trip', tripSchema);
