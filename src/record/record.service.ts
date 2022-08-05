import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { constants } from 'fs';
import { EOL } from 'os';

@Injectable()
export class RecordService {
  private readonly filePath: string;
  private readonly baseName: string;
  private readonly maxFileSize: number;

  private file: fs.FileHandle;

  constructor(filePath: string, baseName: string, maxFileSize: number) {
    this.filePath = filePath;
    this.baseName = baseName;
    this.maxFileSize = maxFileSize;

    void this.createFolder().then(() => this.createFile());
  }

  async write(data: string) {
    if (await this.isFileFull()) {
      await this.createFile();
    }

    await this.file.appendFile(data + EOL, { mode: constants.O_APPEND });
  }

  private async createFolder() {
    await fs.mkdir(this.filePath, { recursive: true });
  }

  private async createFile() {
    await this.file?.close();

    this.file = await fs.open(
      path.resolve(
        this.filePath,
        this.baseName + '-' + new Date().getTime() + '.log',
      ),
      'a+',
    );
  }

  private async isFileFull() {
    const currentSize = await this.file.stat().then(({ size }) => size);
    return currentSize >= this.maxFileSize;
  }
}
