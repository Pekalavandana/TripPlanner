const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const Trip = require('../models/tripModel');

const getTours = asyncHandler(async (req, res) => {
  const destination = req.query.destination;

  const tours = await Trip.find({ destination: destination });

  res.status(200).json(tours);
});

module.exports = { getTours };
