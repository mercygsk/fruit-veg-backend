

const mongoose = require('mongoose');

const vegtableSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    readyToEat: Boolean
});

const Vegtable = mongoose.model('Vegtable', vegtableSchema);  

module.exports = Vegtable;  