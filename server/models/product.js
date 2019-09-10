const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ProductSchema = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    priceUni: {
        type: Number,
        required: [true, 'El nombre es necesario']
    },
    description: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    available: {
        type: String,
        required: true,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }

});

module.exports = mongoose.model('product', ProductSchema);