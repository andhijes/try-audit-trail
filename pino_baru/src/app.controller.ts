// src/app.controller.ts
import { Controller, Get, Post, Req, UseInterceptors } from '@nestjs/common';
import { AuditInterceptor } from './audit/audit.interceptor';
import { AuditService } from './audit/audit.service';

@Controller()
@UseInterceptors(AuditInterceptor)
export class AppController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  getHello(@Req() request: any) {
    this.auditService.logEvent(
      {
        eventType: 'HELLO_REQUEST',
        message: 'Someone accessed the hello endpoint',
      },
      request,
    );
    return { message: 'Hello World!' };
  }

  @Post('error')
  triggerError() {
    throw new Error('Example error for audit trail');
  }
}
