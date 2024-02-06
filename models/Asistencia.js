const { Schema, model } = require('mongoose');

const AsistenciaSchema = Schema({
    id_jugador: { type: String, require: true },
    id_evento: { type: String, require: true },
    estado: { type: String, enum: ['P', 'A', 'T'] }
})

module.exports = model('Asistencia', AsistenciaSchema );