const nodemailer = require('nodemailer'); // Sirve para developer la aplicacion

class Email {
    constructor() {
        // Conectar a nodemailer

        return nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: process.env.MAILTRAP_USER,
            pass:process.env.MAILTRAP_PASSWORD,
            },
        });
    }
}