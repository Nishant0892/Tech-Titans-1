const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'staff'] },
    images: {
        front: { type: String, required: true },
        left: { type: String, required: true },
        right: { type: String, required: true }
    }
});

module.exports = mongoose.model('Staff', StaffSchema);
