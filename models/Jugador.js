const { Schema, model } = require('mongoose');

const JugadorSchema = Schema({
    nombre: { type: String, require: true },
    apellido: { type: String, require: true },
    dni: { type: String, require: true },
    posicion: { type: String, require: true },
    fecha_nacimiento: { type: Date },
    altura: { type: Number, require: true },
    peso: { type: Number, require: true },
    apto: { type: Boolean, default: false },
    cuota: { type: String, enum: ['DIA', 'DEBE']},
    equipo_id: { type: String },
})

module.exports = model('Jugador', JugadorSchema );