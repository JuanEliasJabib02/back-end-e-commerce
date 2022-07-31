const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const pug = require('pug');
const path = require('path');
const { htmlToText } = require('html-to-text');

dotenv.config({ path: './config.env' });

class Email {
	constructor(template) {}

	// Connect to mail service
	newTransport() {
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
	async send(template) {

        // What data should
		const html = pug.renderFile(
			path.join(__dirname, '..', 'views', 'emails', `${template}`),
			{
				title: 'My first mail',
			}
		);

            //From
		await this.newTransport().sendMail({
			from: 'max@gmail.com',
			to: 'john@gmail.com',
			subject: 'Testing with mailtrap',
			html,
			text: htmlToText(html), // nodemail need this for woork good
		});
	}


    // Templates a enviar
    async sendWelcome(){
        await this.send('welcome.pug');
    }

    async sendWelcome(){
        await this.send('welcome.pug');
    }
}

module.exports = { Email };