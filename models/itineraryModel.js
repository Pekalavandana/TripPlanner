const mongoose = require('mongoose');

const itinerarySchema = mongoose.Schema({
  trip: [
    {
      destination: String,
      duration: Number,
      typeOfTrip: String,
    },
  ],
  activity: [
    {
      activityName: String,
      time: Date,
    },
  ],
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  access: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
