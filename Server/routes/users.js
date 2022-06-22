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

//API CALLS


router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

//POST CALL 
router.post('/', async (req, res) => {
  if (req.body.role === 'doctor') {
    try{
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
  catch(error){
    console.log(error);
  }
  }

  else if (req.body.role === 'admin' || req.body.role === 'staff') {
    try{
    const { error } = validateStaff(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let staff = await Staff.findOne({ email: req.body.email });
    if (staff) return res.status(400).send('User already registered ');

    const result = validateStaff(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);
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
  catch(error){
    console.log(error);
  }
  }
});

module.exports = router;