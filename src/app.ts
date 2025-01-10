import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import config from './config';
import { validateRequest } from './middleware/requestValidator';
import { getMetrics } from './controllers/metricsController';
import { AlertService } from './services/AlertService';
import logger from './utils/logger';

const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(cors());
app.use(helmet());


const alertService = new AlertService({
  email: config.SMTP_EMAIL,
  password: config.SMTP_PASSWORD,
  alertEmail: config.ALERT_EMAIL,
  threshold: config.ALERT_THRESHOLD,
  timeWindow: config.TIME_WINDOW
});


app.post('/api/submit', validateRequest(alertService), (req, res) => {
  res.json({ success: true });
});

app.get('/api/metrics', getMetrics);

mongoose.connect(config.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => logger.info('Connected to MongoDB'))
.catch(err => logger.error('MongoDB connection error:', err));


const port = config.PORT;
app.listen(port)
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      logger.warn(`Port ${port} is busy, trying ${Number(port) + 1}`);
      app.listen(Number(port) + 1);
    } else {
      logger.error('Server error:', err);
    }
  })
  .on('listening', () => {
    const address = app.listen().address();
    const actualPort = typeof address === 'string' ? port : address?.port;
    logger.info(`Server running on port ${actualPort}`);
  });

export default app; 