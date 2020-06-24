const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    name: String,
    count: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cities', QuestionSchema);