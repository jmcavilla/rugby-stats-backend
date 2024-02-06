const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { addJugador, getJugadoresByTeam, update } = require('../controllers/jugador');

const router = Router();

router.put(
    '/add',
    [
        validarCampos
    ],
    addJugador
);

router.get(
    '/team',
    [
        validarJWT,
        validarCampos
    ],
    getJugadoresByTeam
)

router.post(
    '/update',
    [
        validarCampos,
        validarJWT
    ],
    update
)

module.exports = router;