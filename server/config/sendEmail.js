import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY is not defined");
}
const resend = new Resend(process.env.RESEND_API_KEY);
const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Blinkeyit <noreply@example.com>',
            to: sendTo,
            subject: subject,
            html: html,
        });
        if (error) {
            return console.error({ error });
        }
        return data;
    } catch (error) {
        console.error({ error });
    }
};

export default sendEmail;