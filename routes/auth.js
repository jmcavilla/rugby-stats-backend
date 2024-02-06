/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken, validarEmail, getData, getCountUsuarios, olvidePassword, cambiarPassword, validarToken, update } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();



router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);


router.post(
    '/new',
    [ // middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);

router.post(
    '/update',
    [
        validarJWT,
        validarCampos
    ],
    update
);

router.post(
    '/confirm',
    [
        check('confirmationCode', 'Es necesario el codigo para realizar la confirmacion').notEmpty(),
        validarCampos
    ],
    validarEmail
);

router.post(
    '/data',
    [
        validarJWT,
        check('email', 'Es necesario el email para buscar la informacion').isEmail(),
        validarCampos
    ],
    getData
);


router.post(
    '/forgot',
    [
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    olvidePassword
);

router.post(
    '/validateToken',
    [
        validarCampos
    ],
    validarToken
);

router.post(
    '/changePassword',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    cambiarPassword
);

router.get(
    '/count',
    [],
    getCountUsuarios
)


router.get('/renew', validarJWT, revalidarToken);




module.exports = router;