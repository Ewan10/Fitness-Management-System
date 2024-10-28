const mongoose = require('mongoose');

const _class = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A class must have a name.']
    },
    trainer: {
        type: String,
        required: [true, 'A class must have a trainer.']
    },
    room: {
        type: Number,
        required: [true, 'A class must be served in a room.']
    },
    numberOfMembers: {
        type: Number,
        required: true
    },
    schedule: [
        {
            session: {
                type: String,
                required: [true, 'A class session must contain the day and the hours.']
            },
        }
    ]
});

const Class = mongoose.model('Class', _class);
module.exports = Class;