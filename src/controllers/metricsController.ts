import { Request, Response } from 'express';
import FailedRequest from '../models/FailedRequest';
import logger from '../utils/logger';

export const getMetrics = async (req: Request, res: Response) => {
    try {
        const timeWindow = parseInt(req.query.timeWindow as string || '60', 10) * 60 * 1000;
        const timeThreshold = new Date(Date.now() - timeWindow);

        const recentFailures = await FailedRequest.find({
            timestamp: { $gte: timeThreshold }
        }).sort({ timestamp: -1 }).limit(100);

        const failuresByIp: Record<string, number> = {};
        recentFailures.forEach(failure => {
            failuresByIp[failure.ip] = (failuresByIp[failure.ip] || 0) + 1;
        });

        const totalFailures = await FailedRequest.countDocuments({
            timestamp: { $gte: timeThreshold }
        });

        res.json({
            totalFailures,
            failuresByIp,
            recentFailures
        });
    } catch (error) {
        logger.error('Error fetching metrics:', error);
        res.status(500).json({ error: 'Error fetching metrics' });
    }
}; 