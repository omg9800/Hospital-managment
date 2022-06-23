const Speakeasy = require("speakeasy");
const { Server } = require('socket.io')
const staff_admin = require('../middleware/staff-admin');
const auth = require('../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Doctor, validateDoctor } = require('../models/doctor');
const { Staff, validateStaff } = require('../models/staff');

io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

// io = io.listen(5000)


// let onlineUsers = [];

// const addNewUser = (username, socketId) => {
//   !onlineUsers.some((user) => user.username === username) &&
//     onlineUsers.push({ username, socketId });
// };

// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (username) => {
//   return onlineUsers.find((user) => user.username === username);
// };


// io.on("connection", (socket) => {
//   socket.on("newUser", (username) => {
//     // addNewUser(username, socket.id);
//     console.log('socket connected.');
//   });

//   socket.on("sendNotification", ({ senderName, receiverName, type }) => {
//     const receiver = getUser(receiverName);
//     io.to(receiver.socketId).emit("getNotification", {
//       senderName,
//       type,
//     });
//   });

//   socket.on("sendText", ({ senderName, receiverName, text }) => {
//     const receiver = getUser(receiverName);
//     io.to(receiver.socketId).emit("getText", {
//       senderName,
//       text,
//     });
//   });

//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//   });
// });



io.on("connection", (socket) => {
  console.log('socket connected.');

  socket.on("disconnect", () => {
    // addNewUser(username, socket.id);
    console.log('disconnected');
  });
})
//API CALLS


router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

//POST CALL 
router.post('/', [auth, staff_admin], async (req, res) => {
  //DOCTOR
  if (req.body.role === 'doctor') {
    try {
      const { error } = validateDoctor(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      let doctor = await Doctor.findOne({ email: req.body.email });
      if (doctor) return res.status(400).send('User already registered ');

      doctor = new Doctor({
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        specialization: req.body.specialization,
        address: req.body.address,
        about: req.body.about,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });

      const salt = await bcrypt.genSalt(10);
      doctor.password = await bcrypt.hash(doctor.password, salt);

      await doctor.save();

      const token = doctor.generateAuthToken();
      doctor = _.pick(doctor, ['name', 'email', '_id', 'role']);
      res.send({ doctor, token });
    }
    catch (error) {
      console.log(error);
    }
  }
  //STAFF OR ADMIN
  else if (req.body.role === 'admin' || req.body.role === 'staff') {
    try {
      const { error } = validateStaff(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      let staff = await Staff.findOne({ email: req.body.email });
      if (staff) return res.status(400).send('User already registered ');

      staff = new Staff({
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        weight: req.body.weight,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });

      const salt = await bcrypt.genSalt(10);
      staff.password = await bcrypt.hash(staff.password, salt);

      await staff.save();
      const token = staff.generateAuthToken();
      staff = _.pick(staff, ['name', 'email', '_id', 'role']);
      res.send({ staff, token });
    }
    catch (error) {
      console.log(error);
    }
  }
  //PATIENT REGISTER
  else if (req.body.role === 'patient') {
    try {
      const { error } = validatePatient(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      patient = await Patient.findOne({ phone: req.body.phone });
      if (patient) return res.status(400).send('User already registered ');

      patient = new Staff({
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        weight: req.body.weight,
        address: req.body.address,
        role: req.body.role
      });
      var secret = Speakeasy.generateSecret({ length: 20 });
      patient.secretKey = secret.base32;

      await patient.save();

      const token = patient.generateAuthToken();
      patient = _.pick(patient, ['name', 'phone', '_id', 'role']);
      res.send({ patient, token });
    }
    catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;