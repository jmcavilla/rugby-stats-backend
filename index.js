const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();
const base_url = '/rugbystats/api';
// Base de datos
dbConnection();

// CORS
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use(`${base_url}/auth`, require('./routes/auth') );
app.use(`${base_url}/league`, require('./routes/competicion') );
app.use(`${base_url}/team`, require('./routes/equipo') );
app.use(`${base_url}/player`, require('./routes/jugador') );
app.use(`${base_url}/event`, require('./routes/evento') );
app.use(`${base_url}/rival`, require('./routes/rival') );
app.use(`${base_url}/attendance`, require('./routes/asistencia') );
// TODO: CRUD: Eventos




// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
    console.log(`Base de datos ${ process.env.DB_CNN }`);
});






