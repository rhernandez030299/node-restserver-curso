const mongoose = require('mongoose');
const Schema = mongoose.Schema;

CategorySchema = new Schema({
    description: {
        type: String,
        required: [true, 'La descripción es requerida']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Category', CategorySchema);