const Joi = require('joi');
const mongoose = require('mongoose');
const { Doctor, validateDoctor } = require('../models/doctor');
const { Patient, validatePatient } = require('../models/patient');

const appointmentSchema = new mongoose.Schema({
                    doctorId: {
                             type: mongoose.Schema.Types.ObjectId,
                             ref:'Doctor'  
                          },
                    name: {
                            type:String,
                            required:true,
                            minlength: 3,
                            maxlength: 100,
                          },
                    age:  {
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
                     dateAssign: {
                                  type: Date,
                                  default : Date.now
                              },
                     dateDischarge : {
                                    type: Date,
                              }
});

const Appointment = mongoose.model('Appointment',appointmentSchema);

const validateAppointment = appointment => {
      const schema = Joi.object({
        doctorId:Joi.string(),
        name:Joi.string().min(3).max(100).required(),
        age:Joi.number().min(22).required(),
        weight: Joi.number().required(),
        symptoms:Joi.string().required(),
        phone:Joi.string().min(10).max(10).required(),
        address:Joi.string().min(5).max(100).required()
       });
       return schema.validate(appointment);
}

exports.Appointment = Appointment;
exports.appointmentSchema = appointmentSchema;
exports.validateAppointment = validateAppointment;