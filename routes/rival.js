const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { getAll, add } = require('../controllers/rival');

const router = Router();

router.get(
    '/',
    [
        validarCampos
    ],
    getAll
);

router.put(
    '/new',
    [
        validarCampos
    ],
    add
)

module.exports = router;