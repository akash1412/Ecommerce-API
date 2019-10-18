const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Product msut have a name'],
        unique: [true, ' Provided name must be Unique '],
        trim: true,
        minlength: 8
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
        default: 4.5
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