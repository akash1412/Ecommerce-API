const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Product msut have a name'],
        unique: [true, ' Provided name must be Unique '],
        trim: true,
        minlength: [10, 'A Producr must have have more or equal to 10 Characters'],
        maxlength: [40, 'A Producr must have have less or equal to 40 Characters']
    },
    price: {
        type: Number,
        required: [true, 'A Tour must have a Price']
    },
    description: {
        type: String,
        required: true
    },
    coverImage: String,
    images: [String],
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above or equal to 1.0'],
        max: [5, 'Rating must be less or equal to 5.0']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: Date.now(),
    }
});

const Product = new mongoose.model('Product', productSchema);

module.exports = Product;