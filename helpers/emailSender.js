require("dotenv").config();
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

const user = process.env.USER;
const pass = process.env.PASS;

var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    },
    pool: true,
    maxConnections: 1,
    auth: {
        user: 'hurricanes.app@outlook.com',
        pass: 'Hurricanes2022'
    },
});
const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: user,
        pass: pass,
    },
});

module.exports.sendConfirmationEmail = (email, confirmationCode, name) => {
    console.log("Check");
    transporter.sendMail({
        from: `"Hurricanes App" <hurricanes.app@outlook.com>`,
        to: email,
        subject: "Por favor, confirmá tu email",
        html: `<h1>Email de confirmación</h1>
            <h2>¡Hola ${name}!</h2>
            <p>Gracias por registrarte. Por favor, confirma tu email ingresando el siguiente codigo en nuestra App o en nuestra web</p>
            <div style="
                width: 100%;
                font-size: 30px;
                padding: 1px;
                display: flex;
                text-align: center;
            ">
                <p> <strong>${confirmationCode}</strong></p>
            </div>
            </div>`,
    }).catch(err => {
        console.error("Error al enviar el mail de confirmacion: ", err);
        throw err;
    });
};
module.exports.sendOlvideEmail = (email, confirmationCode, name) => {
    console.log("Check");
    transporter.sendMail({
        from: `"Hurricanes App" <hurricanes.app@outlook.com>`,
        to: email,
        subject: "¿Olvidaste tu contraseña?",
        html: `<h1>¿Olvidaste tu contraseña?</h1>
            <img style="width: 25%" src="https://hurricanes-rugbyba.herokuapp.com/assets/images/hurricanes_logo.png"/>
            <h2>¡Hola ${name}!</h2>
            <p>Por favor, ingresa el siguiente codigo en la app o en la web para recuperar tu contraseña.</p>
            <div style="
                font-size: 30px;
                padding: 1px;
                display: flex;
                text-align: center;
            ">
                <p style="width: 100%;"> <strong>${confirmationCode}</strong></p>
            </div>
            <p>¿No fuiste vos? Entonces por favor, borra este email.</p>
            </div>`,
    }).catch(err => {
        console.error("Error al enviar el mail de ovlido: ", err);
        throw err;
    });
};

module.exports.sendRifa = (email, name, numbers, comprobante) => {
    transporter.sendMail({
        from: `"Hurricanes App" <hurricanes.app@outlook.com>`,
        to: email,
        subject: "Rifa Hurricanes Rugby",
        html: `
            <img style="width: 25%" src="https://hurricanes-rugbyba.herokuapp.com/assets/images/hurricanes_logo.png"/>
            <h1>¡Hola ${name}!</h1>
            <p>¡MUCHAS GRACIAS POR TU APOYO!</p>
            <p>Te estaremos enviando otro email a esta casilla cuando uno de nuestros administradores confirme tu rifa.</p>
            <p><strong>Numeros:</strong></p>
            <div style="
                display: flex;
                margin: 10px;
                justify-content: center;
            ">

                ${numbers.map(number => (
            `<div style="
                        border: 3px solid #16b152;
                        border-radius: 10px;
                        width: 75px;
                        font-size: 30px;
                        padding: 1px;
                        display: flex;
                        text-align: center;
                    ">
                       <p style="width: 100%;"> <strong>${number}</strong></p>
                    </div>`
        ))}
            </div>
            </div>`,

    });
    transporter.sendMail({
        from: `"Hurricanes App" <hurricanes.app@outlook.com>`,
        to: "juanmcavilla.dev@gmail.com",
        subject: "Nueva Rifa",
        html: `
            <p>Llegó una nueva compra de Rifa</p>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Numeros:</strong></p>
            <div style="
                display: flex;
                margin: 10px;
                justify-content: center;
            ">

                ${numbers.map(number => (
            `<div style="
                        border: 3px solid #16b152;
                        border-radius: 10px;
                        width: 75px;
                        font-size: 30px;
                        padding: 1px;
                        display: flex;
                        text-align: center;
                    ">
                       <p style="width: 100%;"> <strong>${number}</strong></p>
                    </div>`
        ))}
            </div>
            </div>`,

    })
}

module.exports.aproveRifa = (email, name, numbers) => {
    transporter.sendMail({
        from: `"Hurricanes App" <hurricanes.app@outlook.com>`,
        to: email,
        subject: "Rifa Hurricanes Rugby",
        html: `
            <img style="width: 25%" src="https://hurricanes-rugbyba.herokuapp.com/assets/images/hurricanes_logo.png"/>
            <h1>¡Hola ${name}!</h1>
            <p>¡MUCHAS GRACIAS POR TU APOYO!</p>
            <p>Un administador aprobo tu compra. Ya esta asegurada tu participacion en la rifa. ¡PRESTÁ ATENCIÓN A NUESTRAS REDES SOCIALES!</p>
            <p>Numeros:</p>
            <div style="
                display: flex;
                margin: 10px;
                justify-content: center;
            ">

                ${numbers?.map(number => (
            `<div style="
                        border: 3px solid #16b152;
                        border-radius: 10px;
                        width: 75px;
                        font-size: 30px;
                        padding: 1px;
                        display: flex;
                        text-align: center;
                    ">
                        <p style="width: 100%;"> <strong>D${number}</strong></p>
                    </div>`
        ))}
            </div>
            </div>`,

    })
}

module.exports.cuotaNuevo = (email, name, mes, anio) => {
    transporter.sendMail({
        from: `"Hurricanes App" <hurricanes.app@outlook.com>`,
        to: email,
        subject: `Cuota ${mes} de ${anio} `,
        html: `
            <h1>¡Hola ${name}!</h1>
            <p>YA ESTA DISPONIBLE LA CUOTA DE ${mes.toUpperCase()}</p>
            <p>Por favor, acercate a la administración de socios del club para realizar el pago.</p>
            <p>Podes realizar el pago en efectivo o a través de trasnferencia o Mercado pago enviando a los siguientes datos:</p>
            <div style="
                margin: 10px;
                justify-content: center;
            ">
                Nombre: <b>Juan Manuel Cavilla</b> </br>
                Alias: <b>nanofrc.mp</b> </br>
                CVU: <b>0000003100065932043343</b> </br>
                Mercado Pago 
            </div>
            <p>Una vez realizado la transferencia, envianos el comprobante de pago para finalizar la transacción.</p>
            <p>Un saludo,</p></br>
            <p>Administración Hurricanes Rugby</p></br>

            <img style="width: 15%" src="https://hurricanes-ba.herokuapp.com/assets/images/hurricanes_logo.png"/>`,

    })
}
