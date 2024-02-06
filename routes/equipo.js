const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createEquipo, getEquipos, getEquipoById } = require('../controllers/equipo');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new',
    [
        validarJWT,
        validarCampos
    ],
    createEquipo
);

router.post(
    '/id',
    [
        validarCampos
    ],
    getEquipoById
);


router.get(
    '/all',
    getEquipos
);

module.exports = router;