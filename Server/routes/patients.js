const  auth = require('../middleware/auth');
const  admin = require('../middleware/admin');
const  staff = require('../middleware/staff');
const  doctor_staff_admin = require('../middleware/doctor-staff-admin');
const  staff_admin = require('../middleware/staff-admin');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Patient, validatePatient } = require('../models/patient');
const { Doctor, validateDoctor } = require('../models/doctor');
//API CALLS

//GET ALL PATIENT CALL

router.get('/',[auth,doctor_staff_admin] ,async (req,res) => {
     const patients = await Patient.find().sort('name');
     res.send(patients);
});

//POST CALL
router.post('/',[auth,staff_admin], async (req,res) => {
       const result = validatePatient(req.body);
       if(result.error) return res.status(400).send(result.error.details[0].message);

       let patient = new Patient({
           name: req.body.name,
           age: req.body.age,
           weight: req.body.weight,
           phone: req.body.phone,
           symptoms: req.body.symptoms,
           address:req.body.address,
       });
       
       patient = await patient.save();
       res.send(patient);
});

//PUT CALL
router.put('/:id',[auth,staff_admin], async (req,res) => {
    const result = validatePatient(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    let patient = await Patient.findById(req.params.id);
    if(!patient) return res.status(404).send("The Patiend is not found");

    if(!req.body.doctorId)
    {
        patient.name= req.body.name;
        patient.age = req.body.age;
        patient.weight = req.body.weight;
        patient.phone = req.body.phone;
        patient.symptoms = req.body.symptoms;
        patient.address = req.body.address;
    }

    patient  = await patient.save();
    res.send(patient);
});

//DELETE CALL
router.delete('/:id', [auth,doctor_staff_admin] , async (req,res) => {
    let patient = await Patient.deleteOne({_id: req.params.id });
    if(!patient)   return res.status(404).send("The Patient is not found")

    res.send(patient);
});

//GET SINGLE CALL
router.get('/:id', [auth,doctor_staff_admin] ,async (req,res) => {
    const patient = await Patient.findById(req.params.id);
    if(!patient) return res.status(404).send("The Patient is not found");

    res.send(patient);
});

module.exports = router;