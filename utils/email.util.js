const nodemailer = require('nodemailer'); // Sirve para developer la aplicacion

class Email {
    constructor() {
        // Conectar a nodemailer

        return nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "e1a4d55c5b9acd",
            pass: "b8f10e1115a0c4",
            },
        });
    }
}