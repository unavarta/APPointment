const mongoose = require('mongoose');

const especialidadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    especialidad: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Especialidad', especialidadSchema, "Especialidad");