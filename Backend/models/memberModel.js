const mongoose = require('mongoose');

const member = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A member must have a name.'],
        trim: true
    },
    age: {
        type: Number,
        required: [true, 'A member must have an age.'],
    },
    address: {
        type: String,
        required: [true, 'A member must have an address.'],
    },
    phone: {
        type: String,
        required: [true, 'A member must provide one phone number.'],
    },
    classes: [
        {
            type: String,
            required: [true, 'A member must registered in at least one class.']
        }
    ]
});

const Member = mongoose.model('Member', member);

module.exports = Member;