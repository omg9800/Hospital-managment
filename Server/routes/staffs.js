const  auth = require('../middleware/auth');
const  admin = require('../middleware/admin');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');
const { Staff, validateStaff } = require('../models/staff');

//API CALLS

//GET ALL STAFFS CALL

router.get('/',[auth,admin], async (req,res) => {
    try{
     const staffs = await Staff.find().sort('name');
     res.send(staffs);
    }
    catch(error){
        console.log(error);
    }
});

//PUT CALL
router.put('/:id',[auth,admin], async (req,res) => {
    try{
    const result = validateStaff(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const staff = await Staff.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        weight: req.body.weight,
        isAdmin:req.body.isAdmin,
        address:req.body.address,
        email: req.body.email,
        password: req.body.password,
    },{ new: true});

    const salt = await bcrypt.genSalt(10);
    staff.password = await bcrypt.hash(staff.password,salt);

    if(!staff) return res.status(404).send("The staff is not found");
    res.send(staff);
    }
    catch(error){
        console.log(error);
    }
});

//DELETE CALL
router.delete('/:id',[auth,admin], async (req,res) => {
    try{
    let staff = await Staff.deleteOne({_id: req.params.id });
    if(!staff)   return res.status(404).send("The staff is not found")

    res.send(staff);
    }
    catch(error){
        console.log(error);
    }
});

//GET A SINGLE ID
router.get('/:id', [auth,admin] , async (req,res) => {
    try{
    const staff = await Staff.findById(req.params.id);
    if(!staff) return res.status(404).send("The staff is not found");

    res.send(staff);
    }
    catch(error){
        console.log(error);
    }
});

module.exports = router;