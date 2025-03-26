// src/audit/audit.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';

type AuditEvent = {
  eventType: string;
  message: string;
  metadata?: Record<string, any>;
};

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  logEvent(event: AuditEvent, req?: Request) {
    const logEntry = {
      ...event,
      timestamp: new Date().toISOString(),
      sourceIp: req?.ip,
      userAgent: req?.headers['user-agent'],
    };

    this.logger.log(logEntry);
  }

  logError(error: Error, context?: string, req?: Request) {
    const logEntry = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      context,
      timestamp: new Date().toISOString(),
      sourceIp: req?.ip,
    };

    this.logger.error(logEntry);
  }
}
