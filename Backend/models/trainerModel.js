const mongoose = require('mongoose');

const trainer = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A trainer must have a name.'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'A trainer must provide one phone number.'],
    },
    address: {
        type: String,
        required: [true, 'A trainer must provide an address.'],
    },
    email: {
        type: String,
        required: false
    },
    class: {
        type: String,
        required: [true, 'A trainer must train a certain class.']
    }
});

const Trainer = mongoose.model('Trainer', trainer);

module.exports = Trainer;