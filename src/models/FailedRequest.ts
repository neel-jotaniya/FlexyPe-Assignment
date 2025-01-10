import mongoose, { Schema, Document } from 'mongoose';
import { FailedRequestDoc } from '../types';

const failedRequestSchema = new Schema({
    ip: { type: String, required: true, index: true },
    timestamp: { type: Date, required: true },
    reason: { type: String, required: true },
    endpoint: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.model<FailedRequestDoc & Document>('FailedRequest', failedRequestSchema); 