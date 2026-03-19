import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_SECURE, process.env.EMAIL_USER, process.env.EMAIL_PASS);

export const transporter = nodemailer.createTransport({
    host:   process.env.EMAIL_HOST,
    port:   process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    family: 4,
    debug: true,
    logger:true
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

const loadTemplate = async () => {
    const templatePath = path.join(__dirname, '../../template/email.html');
    const template = await fs.promises.readFile(templatePath, 'utf8');
    if (!template) {
        throw new Error('Email template not found');
    }
    return template;
}

export const sendVerificationEmail = async (to, data) => {

    const template = await loadTemplate();
    const emailTemplate = template
        .replaceAll('{{USER_EMAIL}}', to)
        .replaceAll('{{VERIFY_LINK}}', data.verificationLink);
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'Verify your email',
        html: emailTemplate
    });
}