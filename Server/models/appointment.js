const Joi = require('joi');
const mongoose = require('mongoose');
const { Doctor, validateDoctor } = require('../models/doctor');
const { Patient, validatePatient } = require('../models/patient');

const appointmentSchema = new mongoose.Schema({
                    doctor: {
                       type: mongoose.Schema.Types.ObjectId,
                       ref:'Doctor'  
                },
                    patient: {
                       type: mongoose.Schema.Types.ObjectId,
                       ref:'Patient' 
                }
});

const Appointment = mongoose.model('Appointment',appointmentSchema);

const validateAppointment = appointment => {
      const schema = Joi.object({
        doctorId:Joi.string(),
        patientId:Joi.string()
       });
       return schema.validate(appointment);
}

exports.Appointment = Appointment;
exports.appointmentSchema = appointmentSchema;
exports.validateAppointment = validateAppointment;