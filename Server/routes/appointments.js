const Speakeasy = require("speakeasy");
const  auth = require('../middleware/auth');
const  doctor_staff_admin = require('../middleware/doctor-staff-admin');
const ObjectId = require('mongodb').ObjectId; 
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Appointment, validateAppointment } = require('../models/appointment');
const { Doctor, validateDoctor } = require('../models/doctor');
const { Patient, validatePatient } = require('../models/patient');

//API CALLS
router.get('/', [auth,doctor_staff_admin] , async (req,res) => {
    const appointments = await Appointment.find();                                       
   res.send(appointments);
});

router.post('/', [auth,doctor_staff_admin] , async (req,res) => {
    const { error } = validateAppointment(req.body);
    if(error) return res.status(400).send(error.details[0].message);
     try{
    const doctor = await Doctor.findById(req.body.doctorId);
    if(!doctor) return res.status(404).send('Doctor Not Found');

    let appointment = new Appointment({
        doctorId: req.body.doctorId,
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
        phone: req.body.phone,
        symptoms: req.body.symptoms,
        address:req.body.address,
    });
    appointment = await appointment.save();
    
    let patient = new Patient({
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
        phone: req.body.phone,
        symptoms: req.body.symptoms,
        address:req.body.address
    });
    var secret =   Speakeasy.generateSecret({ length: 20 });
    patient.secretKey = secret.base32;

    patient = await patient.save();

    res.send({appointment,patient});
   }
   catch(err){
    console.log(err);
   }
});

router.delete('/:id', [auth,doctor_staff_admin] , async (req,res) => {
    const appointment = await Appointment.findById(req.params.id);
   // patient = Patient.deleteOne({ phone:appointment.phone });
    appointment = await Appointment.deleteOne({_id: req.params.id });
    res.send(appointment);

});

router.get('/:id', [auth,doctor_staff_admin] , async (req,res) => {
    const appointments = await Appointment.findById(req.params.id);
    if(!appointment) return res.status(404).send("There is no appointment");

    res.send(appointment);
});

module.exports = router;