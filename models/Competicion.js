const { Schema, model } = require('mongoose');

const CompeticionSchema = Schema({
    region: { type: String },
    categoria: { type: String },
    temporada: { type: Number },
})

module.exports = model('Competicion', CompeticionSchema );