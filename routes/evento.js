const { Router } = require('express');
const { check } = require('express-validator');
const { createEvento, getAllEvents, startGame, updateGame, endGame } = require('../controllers/evento');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.put(
    '/new',
    [
        validarCampos,
        validarJWT
    ],
    createEvento
);

router.post(
    '/',
    [
        validarCampos
    ],
    getAllEvents
)

router.post(
    '/startGame',
    [
        validarCampos,
        validarJWT
    ],
    startGame
)

router.post(
    '/updateGame',
    [
        validarCampos, validarJWT
    ],
    updateGame
)

router.post(
    '/endGame',
    [validarCampos, validarJWT],
    endGame
)
module.exports = router;