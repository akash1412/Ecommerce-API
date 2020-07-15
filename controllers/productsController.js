const Product = require("../models/productsModel");

exports.getProducts = async (req, res, next) => {
    try {
        let query = Product.find();

        //* sorting 
        if (req.query.sort) {
            query = query.sort(req.query.sort)
        } else {
            // *sort using createdAt schema options
        }


        //* Pagination

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 2;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        const products = await query;

        res.status(200).json({
            status: "success",
            results: products.length,
            data: {
                products
            }
        });
    } catch (err) {
        console.log(err);
        next(err)
        // res.status(400).json({
        //     status: "Fail",
        //     message: err
        // });
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);


        res.status(200).json({
            status: "success",
            data: {
                product
            }
        });
    } catch (err) {
        next(err)
    }

};

exports.addProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            status: "Success",
            message: "product created",
            data: {
                product
            }
        });
    } catch (err) {
        next(err)
    }

};

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true
        });




        res.status(200).json({
            status: "Success",
            message: "product updated",
            data: {
                product
            }
        });
    } catch (err) {
        next(err)
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);




        res.status(200).json({
            status: "Success",
            message: "product deleted",
            data: {
                product
            }
        });
    } catch (err) {
        next(err)
    }
};