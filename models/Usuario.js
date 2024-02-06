const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    equipo_id: {
        type: String
    }
});


module.exports = model('Usuario', UsuarioSchema );

