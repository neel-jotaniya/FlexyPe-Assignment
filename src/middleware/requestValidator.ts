import { Request, Response, NextFunction } from 'express';
import { AlertService } from '../services/AlertService';


export const validateRequest = (alertService: AlertService) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const accessToken = req.headers.authorization;
        const ip = req.ip;

        if (!accessToken || !accessToken.startsWith('Bearer ')) {
            await alertService.trackFailedRequest(ip, 'Invalid or missing authorization header');
            return res.status(401).json({ error: 'Invalid authorization header' });
        }

        const token = accessToken.split(' ')[1];
        if (token !== 'valid-token') {
            await alertService.trackFailedRequest(ip, 'Invalid access token');
            return res.status(401).json({ error: 'Invalid access token' });
        }

        next();
    };
}; 