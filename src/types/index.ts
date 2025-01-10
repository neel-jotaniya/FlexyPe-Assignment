export interface AlertConfig {
    email: string;
    password: string;
    alertEmail: string;
    threshold: number;
    timeWindow: number;
}

export interface FailedRequestDoc {
    ip: string;
    timestamp: Date;
    reason: string;
    endpoint: string;
}

export interface MetricsResponse {
    totalFailures: number;
    failuresByIp: Record<string, number>;
    recentFailures: FailedRequestDoc[];
} 