const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');

const User = require('../models/userModel');
const Trip = require('../models/tripModel');
const Itinerary = require('../models/itineraryModel');

const updateActivity = asyncHandler(async (req, res) => {
  const { addActivity, removeActivity } = req.body;
  const id = req.params.id;

  if (id != created_by) {
    res.status(401);
    throw new Error('You have no access');
  }

  const itinerary = await Itinerary.findById(id);
  if (removeActivity) {
    for (let i = 0; i < itinerary.activity.length; i++) {
      removeActivity.find((activity_id) => {
        if (itinerary.activity[i]._id == activity_id) {
          itinerary.activity.splice(i, 1);
          return;
        }
      });
    }
  }

  if (addActivity) {
    addActivity.forEach((activity) => {
      itinerary.activity.push({
        activityName: activity.activityName,
        time: activity.time,
      });
    });
  }

  await itinerary.save();

  res.status(200).json(itinerary);
});

const updateTrip = asyncHandler(async (req, res) => {
  const { addTrip, removeTrip } = req.body;
  const id = req.params.id;

  if (id != created_by) {
    res.status(401);
    throw new Error('You have no access');
  }

  const itinerary = await Itinerary.findById(id);
  if (removeTrip) {
    for (let i = 0; i < itinerary.trip.length; i++) {
      removeTrip.find((trip_id) => {
        if (itinerary.trip[i]._id == trip_id) {
          itinerary.trip.splice(i, 1);
          return;
        }
      });
    }
  }

  if (addTrip) {
    addTrip.forEach((trip) => {
      itinerary.trip.push({
        destination: trip.destination,
        duration: trip.duration,
        typeOfTrip: trip.typeOfTrip,
      });
    });
  }

  await itinerary.save();

  res.status(200).json(itinerary);
});

const createItinerary = asyncHandler(async (req, res) => {
  const { trip, activity } = req.body;

  const user = await User.findById(req.user._id);
  const itinerary = await Itinerary.create({
    trip,
    activity,
    created_by: req.user._id,
    access: [req.user._id],
  });

  user.itinerary.push(itinerary._id);
  await user.save();

  if (itinerary) {
    res.status(201).json(itinerary);
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

const getItinerary = asyncHandler(async (req, res) => {
  const itinerary = await Itinerary.findById(req.params.id);

  if (!itinerary.access.includes(req.user._id)) {
    res.status(401);
    throw new Error('You have no access');
  }

  res.status(200).json({
    trip: itinerary.trip,
    activity: itinerary.activity,
  });
});

const getItineraries = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const data = [];
  for (let i = 0; i < user.itinerary.length; i++) {
    const itinerary = await Itinerary.findById(user.itinerary[i]);
    data.push({
      trip: itinerary.trip,
      activity: itinerary.activity,
    });
  }

  res.status(200).json(data);
});

const deleteItinerary = asyncHandler(async (req, res) => {
  if (req.user.id != created_by) {
    res.status(401);
    throw new Error('You have no access');
  }

  const user = await User.findById(req.user.id);
  for (let i = 0; i < user.itinerary.length; i++) {
    if (user.itinerary[i] == req.params.id) {
      user.itinerary.splice(i, 1);
    }
  }

  await Itinerary.deleteOne({ _id: req.params.id });

  res.status(204).json();
});

const shareItinerary = asyncHandler(async (req, res) => {
  const { id, userid } = req.params;

  const itinerary = await Itinerary.findById(id);
  if (!(await User.findById(userid))) {
    res.status(400);
    throw new Error('Invalid url');
  }

  itinerary.access.push(userid);
  await itinerary.save();

  res.status(200).json({ message: 'Shared successfully' });
});

module.exports = {
  updateActivity,
  updateTrip,
  createItinerary,
  getItinerary,
  getItineraries,
  deleteItinerary,
  shareItinerary,
};
