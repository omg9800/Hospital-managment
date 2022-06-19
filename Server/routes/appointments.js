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
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    appointment = await appointment.save();
    
    let patient = new Patient({
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
        phone: req.body.phone,
        symptoms: req.body.symptoms,
        address:req.body.address,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    
    patient = await patient.save();
    res.send(appointment);
});

router.delete('/:id1/:id2', [auth,doctor_staff_admin] , async (req,res) => {
    
    let doctor = await Doctor.findById(req.params.id1);
    if(!doctor) return res.status(404).send('Doctor Not Found');

    const patient = await Patient.findById(req.params.id2);
    if(!patient) return  res.status(404).send('Patient Not Found');

    var id = req.params.id;       
    var doctor_id = new ObjectId(req.params.id1);
    var patient_id =  new ObjectId(req.params.id2);

    doctor = await Appointment.deleteOne({doctor: doctor_id, patient:patient_id});
    res.send(doctor);

});

router.get('/:id', [auth,doctor_staff_admin] , async (req,res) => {
    const appointments = await Appointment.findById(req.params.id);
    if(!appointment) return res.status(404).send("There is no appointment");

    res.send(appointment);
});

module.exports = router;