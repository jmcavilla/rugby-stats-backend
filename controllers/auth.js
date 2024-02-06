const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT, generarTokenRegistro } = require('../helpers/jwt');
const nodemailer = require('../helpers/emailSender')
const crearUsuario = async(req, res = response ) => {

    const { email, password, name } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        usuario = new Usuario( req.body );
        // const tokenRegistro = jwt.sign({email: req.body.email}, process.env.SECRET_JWT_SEED)
        const tokenRegistro = generarTokenRegistro({email: req.body.email})
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        usuario.confirmationCode = tokenRegistro;

        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.email );
        
        // nodemailer.sendConfirmationEmail(
        //     usuario.email,
        //     usuario.confirmationCode,
        //     usuario.name
        // );
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            email: usuario.email,
            token,
            status: usuario.status,
            name: usuario.name
        })

        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getData = async (req, res = response) => {
    const { email } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        res.json({
            ok: true,
            uid: usuario.id,
            email: usuario.email,
            status: usuario.status,
            equipo_id: usuario.equipo_id
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const loginUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.email );

        res.json({
            ok: true,
            uid: usuario.id,
            email: usuario.email,
            token,
            equipó_id: usuario.equipo_id
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const loginUsuarioAdmin = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generateTokenAdmin( {uid: usuario.id, email: usuario.email, admin: 'admin'} );

        res.json({
            ok: true,
            uid: usuario.id,
            email: usuario.email,
            token
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const validarEmail = async (req, res = response) => {
    const { confirmationCode } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ confirmationCode });
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El codigo ingresado es invalido'
            });
        }
        usuario.status = "Active";
        await usuario.save()

        res.json({
            ok: true
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const validarToken = async (req, res = response) => {
    const { confirmationCode } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ confirmationCode });
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El codigo ingresado es invalido'
            });
        }

        res.json({
            ok: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const revalidarToken = async (req, res = response ) => {

    const { uid, email } = req;

    // Generar JWT
    const token = await generarJWT( uid, email );

    res.json({
        ok: true,
        token,
        uid,
        email
    })
}

const getCountUsuarios = async (req, res = response) => {
    try {
        let count = await Usuario.count();

        res.status(200).json({
            ok: true,
            count: count
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            error
        })
    }
}

const olvidePassword = async (req, res = response) => {
    const { email } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if(!usuario){
            return res.status(401).json({
                ok: false,
                message: 'No se encontró el usuario'
            })
        }
        console.log("BUSCO TOKEN")
        const tokenRegistro = generarTokenRegistro({ email, other: 'recuperoContrasenia' });
        console.log("BUSCO TOKEN: ", tokenRegistro)
        usuario.confirmationCode = tokenRegistro;

        await usuario.save();

        nodemailer.sendOlvideEmail(
            usuario.email,
            usuario.confirmationCode,
            usuario.name
        );

        return res.status(200).json({
            ok: true
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            error
        })
    }
}

const cambiarPassword = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        res.status(200).json({
            ok: true
        })

        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const update = async (req, res = response) => { 
    try {
        const { email, equipo_id } = req.body;

        let usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        
        usuario.equipo_id = equipo_id;

        usuario.save();

        res.status(200).json({
            ok: true
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    validarEmail,
    getData,
    getCountUsuarios,
    loginUsuarioAdmin,
    olvidePassword,
    cambiarPassword,
    validarToken,
    update
}