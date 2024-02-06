const { response } = require('express');
const bcrypt = require('bcryptjs');
const Competicion = require('../models/Competicion');

const newCompeticion = async (req, res = response) => {
    try {
        let league = new Competicion(req.body);
        league.save();

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

const getCompeticiones = async (req, res = response) => {

    try {
        const competiciones = await Competicion.find();

        res.status(200).json({
            ok: true,
            data: competiciones
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
    getCompeticiones,
    newCompeticion
}