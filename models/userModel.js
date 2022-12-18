const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  itinerary: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Itinerary',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
