// src/audit/audit-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuditService } from './audit.service';

@Catch()
export class AuditExceptionFilter implements ExceptionFilter {
  constructor(private readonly auditService: AuditService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    this.auditService.logError(exception, 'Global Exception Handler', req);

    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
