const mongoose = require('mongoose');

const horarioSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true,
    }, 
    especialidad: {
        type: String,
        required: true,
    },
    documentopaciente: {
        type: Number,
        required: true,
    },
    idturno: {
        type: Number,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Horario', horarioSchema, "Horario");
