const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const pug = require('pug');
const path = require('path');
const { htmlToText } = require('html-to-text');

dotenv.config({ path: './config.env' });

class Email {
	constructor(to) {
        this.to = to; // Para saber a quien va enviado el correo
    }


	// Connect to mail service
	newTransport() {

		if (process.env.NODE_ENV === "production") {
			return nodemailer.createTransport({
				service:'SendGrid',
				auth: {
					user: "apikey",
					pass: process.env.SENDGRID_API_KEY,
				},
			});
		}
		
		return nodemailer.createTransport({
			host: 'smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: process.env.MAILTRAP_USER,
				pass: process.env.MAILTRAP_PASSWORD,
			},
		});
	}

	// Send welcome email to user controller for createUser
	async send(template, subject, mailData) {

        // What data should
		const html = pug.renderFile(
			path.join(__dirname, '..', 'views', 'emails', `${template}`),
			{
				mailData,
			}
		);

            //From
		await this.newTransport().sendMail({
			from: process.env.MAIL_FROM,
			to: this.to,
			subject,
			html,
			text: htmlToText(html), // nodemail need this for woork good
		});
	}


    // Templates a enviar
    async sendWelcome(username){
        await this.send('welcome.pug', 'Bienvenido a hideshi', {username});
    }

    
    async sendPurchased(productsPurchasedPromises){
        await this.send('purchased.pug', 'Gracias por tu compra',{productsPurchasedPromises});
    }
}

module.exports = { Email };