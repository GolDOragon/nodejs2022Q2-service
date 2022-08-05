import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggingService } from '../logging/logging.service';
import { RecordService } from '../record/record.service';
import * as path from 'path';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly loggingService: LoggingService;

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    this.loggingService = new LoggingService(
      HttpExceptionFilter.name,
      new RecordService(
        path.resolve(__dirname, '..', '..', '..', 'logs'),
        'exception',
        +process.env.LOG_FILE_SIZE || 10240,
      ),
    );
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    console.log(this.loggingService);
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    this.loggingService.error({ exception, responseBody });

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
