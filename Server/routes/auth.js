const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Doctor, validateDoctor } = require('../models/doctor');
const { Staff, validateStaff } = require('../models/staff');

//API CALLS

//POST CALL 
router.post('/', async (req,res) => {
      const { error } = validate(req.body);
      if(error) return res.status(400).send(error.details[0].message);
      
      if(req.body.isDoctor)
      {
      let doctor = await Doctor.findOne({ email: req.body.email });
      if (!doctor) return res.status(400).send('Invalid emaiil or password');
    
      //Encrypting password
      const validPassword = await bcrypt.compare(req.body.password,doctor.password);
      if (!validPassword) return res.status(400).send('Invalid email or passwword');
      
      const token = doctor.generateAuthToken();
      res.send(token);
      }
      else if(req.body.isStaff){
         // console.log("Staff");
        let staff = await Staff.findOne({ email: req.body.email });
        if (!staff) return res.status(400).send('Invalid emaiil or password');
      
        //Encrypting password
        const validPassword = await bcrypt.compare(req.body.password,staff.password);
        if (!validPassword) return res.status(400).send('Invalid email or passwword');
        
        const token = staff.generateAuthToken();
        res.send(token);
      }
});

const validate = req => {
    const Schema = Joi.object({
        email : Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isStaff:Joi.boolean(),
        isDoctor:Joi.boolean(),
    })
    return Schema.validate(req);
};

module.exports = router;