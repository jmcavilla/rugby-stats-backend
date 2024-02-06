const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { getCompeticiones, newCompeticion } = require('../controllers/competicion');

const router = Router();

router.get(
    '/',
    [
        validarCampos
    ],
    getCompeticiones
);

router.post(
    '/new',
    [
        validarCampos
    ],
    newCompeticion
)

module.exports = router;