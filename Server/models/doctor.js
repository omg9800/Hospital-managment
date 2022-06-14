const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

//Schema Definition
const doctorSchema = new mongoose.Schema({
     name: {
         type:String,
         required:true,
         minlength: 3,
         maxlength: 100,
     },
     age:{
         type: Number,
         required: true,
         min:22
     },
     phone: {
         type: String,
         required: true,
         minlength: 10,
         maxlength:10,
     },
     specialization: {
        type: Array,
        items: {
            type: String
        },
         required: true,
         minlength:5,
         maxlength:50
     },
     address:{
         type: String,
         required: true,
         minlength:5,
         maxlength:100
     },
     about: {
        type:String,
        required:true,
        minlength: 3,
        maxlength: 100,
    },
    email : {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
     },
     isDoctor: {
        type: Boolean,
        default: true
    }
});

doctorSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isDoctor: this.isDoctor} ,config.get('jwtPrivateKey'));
    return token;
}
//Doctor Model
const Doctor = mongoose.model('Doctor',doctorSchema);

//function to validate Doctor object
const validateDoctor = doctor => {
     const schema = Joi.object({
         name:Joi.string().min(3).max(100).required(),
         about:Joi.string().min(3).max(100).required(),
         age:Joi.number().min(22).required(),
         phone:Joi.string().min(10).max(10).required(),
         specialization:Joi.array().items(Joi.string().min(5).max(50).required()),
         address:Joi.string().min(5).max(100).required(),
         email : Joi.string().min(5).max(255).required().email(),
         password: Joi.string().min(5).max(255).required(),
         isDoctor:Joi.boolean(),
     });
     return schema.validate(doctor);
}

exports.Doctor = Doctor;
exports.doctorSchema = doctorSchema;
exports.validateDoctor = validateDoctor;

