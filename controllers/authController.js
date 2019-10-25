const {
    promisify
} = require('util')
const User = require('./../models/usersModel');

const jwt = require('jsonwebtoken');

const AppError = require('./../utils/appError')

const signToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        })
        const token = signToken(newUser._id)

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        })
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        // 1) get email and password from user (Input)
        const {
            email,
            password
        } = req.body
        if (!email || !password) return next(new AppError('Please provide Email & Password', 401));
        // 2) get user based on the details given above
        const user = await User.findOne({
            email
        }).select('+password');
        console.log(user)
        // 3)compare both the passwords
        if (!user || !await user.comparePassword(password, user.password)) {
            return next(new AppError('Incorrect Email or Password', 401));
        }
        //4) if everything ok send the token
        const token = signToken(user._id)
        res.status(200).json({
            status: 'success',
            token
        })
    } catch (err) {
        next(err)
    }

}

// exports.protect = async (req, res, next) => {
//     try {
//         // 1) get Token fromthe url
//         let token;
//         if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//             token = req.headers.authorization.split(' ')[1];
//         }
//         console.log(token);
//         if (!token) {
//             return next(new AppError('You are not logged in !, Please login to access this route', 401))
//         }
//         // 2) Verify Token
//         const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//         console.log(decoded)
//         // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         //     if (err) console.log(err)

//         //     console.log(decoded)
//         // })
//         // 3) Check ig the user exists

//         // 4)check if the user changed the password,after the token was issued
//         next()
//     } catch (err) {
//         next(err)
//     }
// }