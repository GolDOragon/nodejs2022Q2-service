import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from './logging.service';
import * as path from 'path';
import { RecordService } from '../record/record.service';

export class LoggingMiddleware implements NestMiddleware {
  private DEFAULT_FILE_SIZE = 10240;

  private readonly logger: Logger;
  constructor() {
    this.logger = new LoggingService(
      LoggingMiddleware.name,
      new RecordService(
        path.resolve(__dirname, '../', '../', '../', 'logs'),
        'request',
        +process.env.LOG_FILE_SIZE * 1024 || this.DEFAULT_FILE_SIZE,
      ),
    );
  }

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { url, query, body } = req;
      const { statusCode, statusMessage } = res;

      const message = `[timestamp-${new Date().getTime()}] ${JSON.stringify({
        url,
        query,
        body,
        statusCode,
        statusMessage,
      })}`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }
      if (statusCode >= 400) {
        return this.logger.warn(message);
      }
      return this.logger.log(message);
    });

    next();
  }
}
