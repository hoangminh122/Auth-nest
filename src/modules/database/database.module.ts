import { Module } from '@nestjs/common/decorators';
import { databaseProvider } from './database.provider';
import { UnitOfWork } from './UnitOfWork';

@Module({
  providers: [databaseProvider, UnitOfWork],
  exports: [databaseProvider, UnitOfWork],
})
export class DatabaseModule {}
