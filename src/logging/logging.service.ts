import { Injectable, Logger } from '@nestjs/common';
import { RecordService } from '../record/record.service';

@Injectable()
export class LoggingService extends Logger {
  constructor(context: string, private readonly recordService: RecordService) {
    super(context);
  }

  log(message: any, context?: string) {
    super.log.apply(this, [message, context]);
    void this.recordService.write(JSON.stringify({ level: 'log', message }));
  }
  error(message: any, stack?: string, context?: string) {
    super.error.apply(this, [message, stack, context]);
    void this.recordService.write(JSON.stringify({ level: 'error', message }));
  }
  warn(message: any, context?: string) {
    super.warn.apply(this, [message, context]);
    void this.recordService.write(JSON.stringify({ level: 'warn', message }));
  }
  debug(message: any, context?: string) {
    super.debug.apply(this, [message, context]);
    void this.recordService.write(JSON.stringify({ level: 'debug', message }));
  }
  verbose(message: any, context?: string) {
    super.verbose.apply(this, [message, context]);
    void this.recordService.write(
      JSON.stringify({ level: 'verbose', message }),
    );
  }
}
