const { Schema, model } = require('mongoose');

const RivalSchema = Schema({
    nombre: { type: String, require: true },
    competicion_id: { type: String, require: true },
    equipo_id: { type: String },
})

module.exports = model('Rival', RivalSchema );