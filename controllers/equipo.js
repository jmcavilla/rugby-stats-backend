const { response } = require('express');
const Equipo = require('../models/Equipo');

const createEquipo = async (req, res = response) => {

    const { nombre, imagen, nombre_corto, competicion, uid } = req.body;

    try {

        let equipo = new Equipo();

        equipo.nombre = nombre;
        equipo.nombre_corto = nombre_corto;
        equipo.imagen = imagen;
        equipo.competicion = competicion;
        equipo.administrable = true;

        equipo.save();

        res.status(201).json({
            ok: true
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const getEquipoById = async (req, res = response) => {
    try {
        const { id } = req.body;
        const equipos = await Equipo.findOne({ _id: id });
        res.status(201).json({
            ok: true,
            data: equipos
        })
    } catch (error) {

    }
}

const getEquipos = async (req, res = response) => {
    try {
        const equipos = await Equipo.find();
        res.status(201).json({
            ok: true,
            data: equipos
        })
    } catch (error) {

    }
}

module.exports = {
    createEquipo,
    getEquipos,
    getEquipoById
}