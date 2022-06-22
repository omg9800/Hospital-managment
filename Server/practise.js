const Joi = require('joi');
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
                    doctor: {
                        type: new mongoose.Schema({
                            name: {
                              type:String,
                              required:true,
                              minlength: 3,
                              maxlength: 100,
                           },
                           about: {
                              type:String,
                              required:true,
                              minlength: 3,
                              maxlength: 100,
                        },
                           specialization: {
                               type: Array,
                               items: {
                                 type: String
                               },
                               required: true,
                               minlength:5,
                               maxlength:50
                         }
                    })
                },
                patient: {
                       type: new mongoose.Schema({
                            name: {
                                type:String,
                                required:true,
                                minlength: 3,
                                maxlength: 100,
                                  },
                            symptoms: {
                                type: Array,
                                items: {
                                  type: String
                                    },
                                required: true,
                                minlength:3,
                                maxlength:50
                                }
                       })
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


const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const boolean = require('joi/lib/types/boolean');
const { Doctor} = require('../models/doctor');
const { Staff, validateStaff } = require('../models/staff');

const userSchema = new mongoose.Schema({
     name : {
         type: String,
         required: true,
         minlength: 5,
         maxlength: 50
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
     isAdmin: {
         type: Boolean,
         default: false
     },
     isDoctor: {
        type: Boolean,
        default: false
    },
     isStaff: {
        type: Boolean,
        default: false
    },
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Doctor' ,
        default: null
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Staff' ,
        default: null
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin , isDoctor: this.isDoctor, isStaff: this.isStaff ,doctorId: this.doctorId, staffId: this.staffId} ,config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User',userSchema);

const validateUser = user => {
     const Schema = Joi.object({
         name: Joi.string().min(5).max(255).required(),
         email : Joi.string().min(5).max(255).required().email(),
         password: Joi.string().min(5).max(255).required(),
         isAdmin:Joi.boolean(),
         isDoctor:Joi.boolean(),
         isStaff:Joi.boolean(),
         doctorId:Joi.string(),
         staffId:Joi.string()
     });
     return Schema.validate(user);
};

exports.User = User;
exports.validateUser = validateUser;