// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuditExceptionFilter } from './audit/audit-exception.filter';
import { AuditService } from './audit/audit.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const auditService = app.get(AuditService);

  app.useGlobalFilters(new AuditExceptionFilter(auditService));
  await app.listen(3003);
}
bootstrap();
