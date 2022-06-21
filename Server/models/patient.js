const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

//Schema Definition
const patientSchema = new mongoose.Schema({
     name: {
         type:String,
         required:true,
         minlength: 3,
         maxlength: 100,
     },
     age:{
         type: Number,
         required: true
     },
     weight: {
         type: Number,
         required: true
     },
     phone: {
         type: String,
         required: true,
         minlength: 10,
         maxlength:10,
     },
     symptoms: {
        type: String,
        required: true,
        minlength:5,
        maxlength:100
     },
     address: {
         type: String,
         required: true,
         minlength:5,
         maxlength:100
     },
    role: {
        type: String,
        default: "patient"
    },
     dateAssign: {
        type: Date,
        default : Date.now
    },
    dateDischarge : {
          type: Date,
    },
    secretKey : {
        type: String
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024
    },
});

patientSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.role }, config.get('jwtPrivateKey'));
    return token;
}

//Patient Model
const Patient = mongoose.model('Patient',patientSchema);

//function to validate Patient object
const validatePatient = patient => {
     const schema = Joi.object({
         name:Joi.string().min(3).max(100).required(),
         age:Joi.number().min(22).required(),
         weight: Joi.number().required(),
         symptoms:Joi.string().required(),
         phone:Joi.string().min(10).max(10).required(),
         address:Joi.string().min(5).max(100).required()
     });
      return schema.validate(patient);
}

exports.Patient = Patient;
exports.patientSchema = patientSchema;
exports.validatePatient = validatePatient;


