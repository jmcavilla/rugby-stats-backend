const { response } = require('express');
const Evento = require('../models/Evento');
const moment = require('moment');

const createEvento = async( req, res = response ) => {
    
    try {

        const { tipo, rival_id, competicion_id } = req.body;

        if(tipo === "PARTIDO"){
            if(!rival_id || !competicion_id){
                return res.status(400).json({
                    ok: false,
                    message: 'Bad Request'
                })
            }
        }

        const evento = new Evento( {
            ...req.body,
        } );
        await evento.save();

        res.status(201).json({
            ok: true
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Ocurrio un error al guardar el evento'
        })
    }

}

const getAllEvents = async(req, res = response) => {
    try {
        const { equipo_id } = req.body;
        console.log(equipo_id)
        const eventos = await Evento.find({ equipo_id });

        res.status(200).json({
            ok: true,
            data: eventos
        })
    } catch (error) {
        console.error(error);
        res.status(200).json({
            ok: false,
            message: 'Ocurrio un error al buscar los eventos'
        })
    }
}

const startGame = async (req, res = response) => {
    try {
        const { _id } = req.body;
        let evento = await Evento.findOne({ _id })

        if(!evento){
            return res.status(400).json({
                ok: false,
                message: 'Evento no encontrado'
            })
        }

        if(evento.estado === "INICIADO"){
            return res.status(201).json({
                ok: true,
                message: 'El evento ya esta iniciado',
                data: evento
            })
        }

        evento.estado = "INICIADO";
        evento.tiempo_actual = 0;

        evento.save()

        res.status(201).json({
            ok: true,
            data: evento
        })

    } catch (error) {
        console.error(error);
        res.status(200).json({
            ok: false,
            message: 'Ocurrio un error al buscar los eventos'
        })
    }
}

const updateGame = async (req, res = response) => {
    try {
        const { _id, tiempo_actual, resultado, resultado_rival } = req.body;

        let evento = await Evento.findOne({ _id });

        if(!evento){
            return res.status(400).json({
                ok: false,
                message: 'Evento no encontrado'
            })
        }

        evento.tiempo_actual = tiempo_actual;
        evento.resultado = resultado;
        evento.resultado_rival = resultado_rival;

        evento.save();

        res.status(201).json({
            ok: true,
            data: evento
        })

    } catch (error) {
        console.error(error);
        res.status(200).json({
            ok: false,
            message: 'Ocurrio un error al buscar los eventos'
        })
    }
} 

const endGame = async (req, res = response) => {
    try {
        const { _id, resultado, resultado_rival } = req.body;
        let evento = await Evento.findOne({ _id })

        if(!evento){
            return res.status(400).json({
                ok: false,
                message: 'Evento no encontrado'
            })
        }

        if(evento.estado !== "INICIADO"){
            return res.status(201).json({
                ok: true,
                message: 'El evento ya esta finalizado',
                data: evento
            })
        }

        evento.estado = "FINALIZADO";
        evento.tiempo_actual = 80;
        evento.resultado = resultado;
        evento.resultado_rival = resultado_rival;

        evento.save()

        res.status(201).json({
            ok: true,
            data: evento
        })

    } catch (error) {
        console.error(error);
        res.status(200).json({
            ok: false,
            message: 'Ocurrio un error al buscar los eventos'
        })
    }
}

module.exports = {
    createEvento,
    getAllEvents,
    startGame,
    updateGame,
    endGame
}