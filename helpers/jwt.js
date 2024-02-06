const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '7d'
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );

        })


    })
}

const generateTokenAdmin = (data) => {
    return jwt.sign(data, process.env.SECRET_JWT_SEED)
}

const generarTokenRegistro = (data) => {
    // return jwt.sign(data, process.env.SECRET_JWT_SEED)
    return `HUR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
}



module.exports = {
    generarJWT,
    generarTokenRegistro,
    generateTokenAdmin
}


