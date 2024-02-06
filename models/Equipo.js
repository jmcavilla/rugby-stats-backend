const { Schema, model } = require('mongoose');

const EquipoSchema = Schema({
    nombre: { type: String, require: true },
    nombre_corto: { type: String },
    imagen: { type: String, require: true },
    competicion: { type: String },
})

module.exports = model('Equipo', EquipoSchema );