const express = require('express');

const router = express.Router()

module.exports = router;

const Especialidad = require('../model/Especialidad');
const Horario = require('../model/Horario');


//post especialidad
router.post('/postEspecialidad', async (req, res) => {
    const especialidad = new Especialidad({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        especialidad: req.body.especialidad
    })
    try {
        const dataToSave = await especialidad.save();
        res.status(200).json(dataToSave);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//post horario
router.post('/postHorario', async (req, res) => { 
    const horario = new Horario({
        fecha: req.body.fecha,
        especialidad: req.body.especialidad,
        documentopaciente: req.body.documentopaciente,
        idturno: req.body.idturno
    })
    try {
        const dataToSave = await horario.save();
        res.status(200).json(dataToSave);

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})


//get todas las especialidades
router.get('/getespecialidades/', async (req, res) => {
    try {
        const especialidades = await Especialidad.find();
        res.status(200).json(especialidades);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
});

//get todos los horarios agendados
router.get('/getHorarios', async (req, res) => {
    try {
        const horarios = await Horario.find();
        res.status(200).json(horarios);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
});
router.get('/getHorarios/:idturno', async (req, res) => {
    try {
        const horarios = await Horario.find({ idturno: req.params.idturno });
        res.status(200).json(horarios);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
});

//get horarios agendados por especialidad
router.get('/getHorarios/:especialidad', async (req, res) => {
    try {
        const horarios = await Horario.find({ especialidad: req.params.especialidad });
        res.status(200).json(horarios);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
});

//get horarios agendados por fecha
router.get('/getHorarios/:fecha', async (req, res) => {
    try {
        const horarios = await Horario.find({ fecha: req.params.fecha });
        res.status(200).json(horarios);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
});

router.delete('/deleteHorario/:idturno', async (req, res) => {
    try {
        const horario = await Horario.deleteOne({ idturno: req.params.idturno });
        res.status(200).json(horario);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
});