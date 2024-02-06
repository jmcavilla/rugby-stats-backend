const { response } = require('express');
const Asistencia = require('../models/Asistencia');

const add = async (req, res = response) => {
    try {
        let asistencia = new Asistencia(req.body);
        asistencia.save();

        res.status(201).json({
            ok: true
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getEvento = async (req, res = response) => {

    try {
        const { id_evento } = req.body;
 
        const asistencias = await Asistencia.find({ id_evento });

        res.status(200).json({
            ok: true,
            data: asistencias
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const getPlayer = async (req, res = response) => {

    try {
        const { id_jugador } = req.body;
        const asistencias = await Asistencia.find({ id_jugador });
        res.status(200).json({
            ok: true,
            data: asistencias
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

module.exports = {
    add,
    getEvento,
    getPlayer
}