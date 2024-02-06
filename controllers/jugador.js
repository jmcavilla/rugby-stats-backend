const { response } = require('express');
const Jugador = require('../models/Jugador');

const addJugador = async (req, res = response) => {
    try {
        const { dni } = req.body;

        let jugador = await Jugador.findOne({ dni })

        if (jugador) {
            return res.status(500).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        jugador = new Jugador(req.body);

        jugador.save();

        res.status(200).json({
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

const getJugadoresByTeam = async (req, res = response) => {
    try {
        const { team_id } = req.body;

        const jugadores = await Jugador.find({ equipo_id: team_id })

        res.status(200).json({
            ok: true,
            data: jugadores
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const update = async (req, res = response) => {
    try {
        const { dni, nombre,
            apellido,
            posicion,
            fecha_nacimiento,
            altura,
            peso,
            cuota,
            apto } = req.body;

        let jugador = await Jugador.findOne({ dni });

        if (!jugador) {
            return res.status(500).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        jugador.nombre = nombre;
        jugador.apellido = apellido;
        jugador.posicion = posicion;
        jugador.fecha_nacimiento = fecha_nacimiento;
        jugador.altura = altura;
        jugador.peso = peso;
        jugador.cuota = cuota;
        jugador.apto = apto;
        jugador.save()

        res.status(200).json({
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

module.exports = {
    addJugador,
    getJugadoresByTeam,
    update
}