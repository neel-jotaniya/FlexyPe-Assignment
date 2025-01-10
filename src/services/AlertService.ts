import * as nodemailer from 'nodemailer';
import { AlertConfig } from '../types';
import FailedRequest from '../models/FailedRequest';
import logger from '../utils/logger';

export class AlertService {
    private config: AlertConfig;
    private transporter: nodemailer.Transporter;

    constructor(config: AlertConfig) {
        this.config = config;
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email,
                pass: config.password
            }
        });
    }

    async trackFailedRequest(ip: string | undefined, reason: string): Promise<void> {
        if (!ip) {
            logger.warn('No IP address provided for failed request');
            return;
        }

        try {
            await FailedRequest.create({
                ip,
                timestamp: new Date(),
                reason,
                endpoint: '/api/submit'
            });

            await this.checkAndAlert(ip);
        } catch (error) {
            logger.error('Error tracking failed request:', error);
        }
    }

    async checkAndAlert(ip: string): Promise<void> {
        try {
            const timeThreshold = new Date(Date.now() - this.config.timeWindow);
            const failedAttempts = await FailedRequest.countDocuments({
                ip,
                timestamp: { $gte: timeThreshold }
            });

            if (failedAttempts >= this.config.threshold) {
                await this.sendAlert(ip, failedAttempts);
            }
        } catch (error) {
            logger.error('Error in checkAndAlert:', error);
        }
    }

    private async sendAlert(ip: string, attempts: number): Promise<void> {
        const mailOptions = {
            from: this.config.email,
            to: this.config.alertEmail,
            subject: `Alert: Multiple Failed Requests from IP ${ip}`,
            text: `Warning: IP address ${ip} has made ${attempts} failed requests in the last ${this.config.timeWindow / 60000} minutes.`
        };

        try {
            await this.transporter.sendMail(mailOptions);
            logger.info(`Alert sent for IP: ${ip}`);
        } catch (error) {
            logger.error('Error sending alert:', error);
        }
    }
} 