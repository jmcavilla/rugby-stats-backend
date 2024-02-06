const { response } = require('express');
const bcrypt = require('bcryptjs');
const Rival = require('../models/Rival');

const add = async (req, res = response) => {
    try {
        let rival = new Rival(req.body);
        rival.save();

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

const getAll = async (req, res = response) => {

    try {
        const rivales = await Rival.find();

        res.status(200).json({
            ok: true,
            data: rivales
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
    getAll
}