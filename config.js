import { config } from "dotenv";
import nodemailer from 'nodemailer';

config();

export const PORT = process.env.PORT || 4000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "123456";
export const DB_DATABASE = process.env.DB_DATABASE || "EMASAC_V";


export const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
        user: 'postmaster@sandbox171d403a1c2e42b59e5300a4770ec4f6.mailgun.org',
        pass: 'f323e98b567e0210bbdd74a5b67c905b-f0e50a42-62872a08',
    },
});
