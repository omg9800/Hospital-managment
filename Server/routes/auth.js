const Speakeasy = require("speakeasy");
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Doctor } = require('../models/doctor');
const { Staff } = require('../models/staff');
const { Patient } = require('../models/patient');

//API CALLS

//POST CALL 
router.post('/', async (req, res) => {
      const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

//DOCTOR
    if (req.body.role === 'doctor') {
        // const { error } = validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);

        try{
        let doctor = await Doctor.findOne({ email: req.body.email });
        if (!doctor) return res.status(400).send('Invalid emaiil or password');

        //Encrypting password
        const validPassword = await bcrypt.compare(req.body.password, doctor.password);
        if (!validPassword) return res.status(400).send('Invalid email or passwword');

        const token = doctor.generateAuthToken();
        doctor = _.pick(doctor, ['name','age','phone','specialization','address','about','email' ]);
        res.send({ doctor, token: token });
        }
        catch(error){
            console.log(error);
        }
    }
    //ADMIN AND STAFF
    else if (req.body.role === 'admin' || req.body.role === 'staff') {
        // const { error } = validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);

        try{
        let staff = await Staff.findOne({ email: req.body.email });
        if (!staff) return res.status(400).send('Invalid emaiil or password');

        //Encrypting password
        const validPassword = await bcrypt.compare(req.body.password, staff.password);
        if (!validPassword) return res.status(400).send('Invalid email or passwword');

        const token = staff.generateAuthToken();
        staff = _.pick(staff, ['name','age','phone','address','email']);
        res.send({ staff, token });
        }
        catch(error){
            console.log(error);
        }
    }
    //PATIENT
    else if (req.body.role === 'patient'){
        // const { error } = validatepatient(req.body);
        // if (error) return res.status(400).send(error.details[0].message);
        let patient = await Patient.findOne({ phone: req.body.phone });
        if (!patient) return res.status(400).send('Invalid number ');

         const secretKey =  patient.secretKey;

        let validPassword = Speakeasy.totp.verify({
            secret: secretKey,
            encoding: "base32",
            token: req.body.password,
            window: 0
        })
        if (!validPassword) return res.status(400).send('Invalid number or OTP');
        
        const token = patient.generateAuthToken();
        patient = _.pick(patient, ['name','age','phone','address']);
        res.send({ patient, token });
    } 
});

const validate = req => {
    const Schema = Joi.object({
        email: Joi.string().min(5).max(255).email(),
        password: Joi.string().min(5).max(255).required(),
        phone:Joi.string().min(10).max(10),
        role: Joi.string(),
    })
    return Schema.validate(req);
};

// const validatepatient = req => {
//     const Schema = Joi.object({
//         phone:Joi.string().min(10).max(10).required(),
//         password: Joi.string().min(6).max(255).required(),
//         role: Joi.string(),
//     })
//     return Schema.validate(req);
// };

module.exports = router;