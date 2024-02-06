const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    fecha: { type: String, require: true },
    hora_inicio: { type: String, require: true },
    hora_fin: { type: String },
    descripcion: { type: String, require: true },
    tipo: { type: String, enum: ['PARTIDO', 'ENTRENAMIENTO', 'CLUB'], default: 'ENTRENAMIENTO'},
    equipo_id: { type: String, require: true},
    rival_id: { type: String },
    local: { type: Boolean, default: true },
    resultado: { type: Number },
    resultado_rival: { type: Number },
    estado: { type: String, enum: ['PROXIMO', 'INICIADO', 'FINALIZADO']},
    tiempo_actual: { type: Number },
    competicion_id: { type: String },
    
})

module.exports = model('Evento', EventoSchema );