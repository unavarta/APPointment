const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    }, 
    apellido: {
        type: String,
        required: true,
    }, 
    documento: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Paciente', pacienteSchema, "Paciente");
