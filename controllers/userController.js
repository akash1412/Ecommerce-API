const User = require("../models/usersModel");

exports.getUsers = async (req, res, next) => {
    try {
        let query = User.find();

        //* sorting 
        query = query.sort(req.query.sort)

        //* Pagination

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 2;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        const users = await query;
        res.status(200).json({
            status: "success",
            results: users.length,
            data: {
                users
            }
        });
    } catch (err) {
        console.log(err);
        next(err)
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                user
            }
        });
    } catch (err) {
        next(err)
    }

};

exports.createUser = async (req, res, next) => {
    try {

        const user = await User.create(req.body);
        res.status(201).json({
            status: "Success",
            message: "user created",
            data: {
                user
            }
        });
    } catch (err) {
        next(err)
    }

};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true
        });

        res.status(200).json({
            status: "Success",
            message: "user updated",
            data: {
                user
            }
        });
    } catch (err) {
        next(err)
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "Success",
            message: "user deleted",
            data: {
                user
            }
        });
    } catch (err) {
        next(err)
    }
};