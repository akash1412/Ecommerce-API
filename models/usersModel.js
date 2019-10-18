const mongoose = require('mongoose');
const validator = require('validator');

const {
    Schema
} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please Tell us your Name'],
        trim: true,
        minlength: 6,
        maxlength: 22
    },
    email: {
        type: String,
        required: [true, 'Please Provide your Email Address'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please Provide an Valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password'],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please Confirm your Password'],
        select: false,
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords are not Same'
        }
    },
    createAt: {
        type: Date,
        default: Date.now(),
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User