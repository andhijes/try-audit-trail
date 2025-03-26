// src/audit/audit.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from './audit.service';
import { Request } from 'express';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    return next.handle().pipe(
      tap(() => {
        this.auditService.logEvent(
          {
            eventType: 'API_REQUEST',
            message: `Handled ${req.method} ${req.path}`,
            metadata: {
              method: req.method,
              path: req.path,
              params: req.params,
              query: req.query,
            },
          },
          req,
        );
      }),
    );
  }
}
