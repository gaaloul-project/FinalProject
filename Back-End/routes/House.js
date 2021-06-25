const express = require("express");
const router = express.Router();
const authMiddleware = require("../Helper/authMiddleware");
const { body, validationResult } = require('express-validator');
const User = require ("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'./config/.env'})


//Multer ---------------------------------------------------------------
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });


//create rooms
router.post("/rooms", authMiddleware, upload.single("imageData"), async (req, res) => {
    console.log("Posted", req.user);
    const body = { ...req.body, imageData: req.file, host: req.userId };
    const room = new Room(body);
    try {
      await room.save();
      res.status(201).send(room);
    } catch (err) {
      res.status(400).send(err);
    }
  });




  //Get all Rooms
router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (err) {
    res.status(500).send();
  }
});



//Get Rooms by Host
router.get("/rooms/me", authMiddleware, async (req, res) => {
  try {
    const rooms = await Room.find({ host: req.userId });
    res.send(rooms);
  } catch (err) {
    res.status(500).send();
  }
});

//Get Rooms by location
router.get("/rooms/location/:location", async (req, res) => {
  const location = req.params.location;
  try {
    const rooms = await Room.find({
      location: { $regex: location, $options: "i" },
    });
    if (!rooms) {
      res.status(404).send();
    }
    res.send(rooms);
  } catch (err) {
    res.status(500).send();
  }
});

//Get Rooms by the number of guests
router.get("/rooms/guests/:guests", async (req, res) => {
  const guests = req.params.guests;
  try {
    const rooms = await Room.find({ guests: guests });
    res.status(404).send();
  } catch (err) {
    res.status(500).send();
  }
});

//Delete Room by id
router.delete("/rooms/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const rooms = req.body;
    console.log(id);
    const room = await Room.findByIdAndDelete(id);
    //const rooms = await Room.deleteOne({ _id: req.user._id });
    res.send(room);
  } catch (err) {
    res.status(500).send();
  }
});
