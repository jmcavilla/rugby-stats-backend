const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getPlayer, getEvento, add } = require('../controllers/asistencia');

const router = Router();

router.get(
    '/event',
    [
        validarCampos,
        validarJWT
    ],
    getEvento
);

router.get(
    '/player',
    [
        validarCampos,
        validarJWT
    ],
    getPlayer
)

router.put(
    '/add',
    [ validarCampos, validarJWT ],
    add
)

module.exports = router;