const mongoose = require('mongoose');

const TheftLogSchema = new mongoose.Schema({
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: false },
    detectedFace: { type: String, required: true },  // Image of unauthorized person
    timestamp: { type: Date, default: Date.now },
    location: { type: String }  // Which section of inventory
});

module.exports = mongoose.model('TheftLog', TheftLogSchema);
