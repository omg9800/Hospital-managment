const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

//Schema Definition
const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    age: {
        type: Number,
        required: true,
        min: 22
    },
    weight: {
        type: Number,
        default: null
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    email: {
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
    role: {
        type: String,
        required: true
    }
});

staffSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin, isStaff: this.isStaff }, config.get('jwtPrivateKey'));
    return token;
}

//Staff Model
const Staff = mongoose.model('Staff', staffSchema);

//function to validate Staff object
const validateStaff = Staff => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        age: Joi.number().min(22).required(),
        weight: Joi.number(),
        phone: Joi.string().min(10).max(10).required(),
        address: Joi.string().min(5).max(100).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        role: Joi.string().required(),
    });
    return schema.validate(Staff);
}

exports.Staff = Staff;
exports.staffSchema = staffSchema;
exports.validateStaff = validateStaff;


