const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const pug = require('pug');
const path = require('path');
const { htmlToText } = require('html-to-text');

dotenv.config({ path: './config.env' });

class Email {
	constructor() {}

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
	async send() {

        // What data should
		const html = pug.renderFile(
			path.join(__dirname, '..', 'views', 'emails', 'base.pug'),
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
}

module.exports = { Email };