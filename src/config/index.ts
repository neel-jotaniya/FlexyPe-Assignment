import dotenv from 'dotenv';
dotenv.config();

if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD || !process.env.ALERT_EMAIL) {
    throw new Error('Missing required environment variables');
}

export default {
    PORT: process.env.PORT || 3000,
    SMTP_EMAIL: process.env.SMTP_EMAIL,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    ALERT_EMAIL: process.env.ALERT_EMAIL,
    ALERT_THRESHOLD: parseInt(process.env.ALERT_THRESHOLD || '5', 10),
    TIME_WINDOW: parseInt(process.env.TIME_WINDOW || '10', 10) * 60 * 1000, // Convert minutes to ms
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/Flexype'
} as const; 