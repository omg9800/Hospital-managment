const  auth = require('../middleware/auth');
const  admin = require('../middleware/admin');
const  staff_admin = require('../middleware/staff-admin');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');
const { Doctor, validateDoctor } = require('../models/doctor');
const { Patient, validatePatient } = require('../models/patient');

//API CALLS

//GET ALL PATIENT CALL

router.get('/', [auth,staff_admin] , async (req,res) => {
     const patients = await Doctor.find().sort('name');
     res.send(patients);
});

//PUT CALL
router.put('/:id', [auth,admin], async (req,res) => {
    const result = validateDoctor(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);
    let doctor;

    doctor = await Doctor.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            age: req.body.age,
            phone: req.body.phone,
            specialization: req.body.specialization,
            address:req.body.address,
            about:req.body.about,
            email: req.body.email,
            password: req.body.password
        },{ new: true});

        const salt = await bcrypt.genSalt(10);
        doctor.password = await bcrypt.hash(doctor.password,salt);

    if(!doctor) return res.status(404).send("The Doctor is not found");

    res.send(doctor);
});

//DELETE CALL on deleteing patient from doctor's list
router.delete('/:id',  [auth,admin],async (req,res) => {

    let doctor = await Doctor.deleteOne({_id: req.params.id });
    if(!doctor)   return res.status(404).send("The Patient is not found")

    res.send(doctor);
});

//GET SINGLE CALL
router.get('/:id',[auth,staff_admin] ,async (req,res) => {
     const doctor = await Doctor.findById(req.params.id);

     if(!doctor) return res.status(404).send("The Doctor is not found");

     res.send(doctor);
});

module.exports = router;