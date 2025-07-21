import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { MysqlModule } from './modules/mysql/mysql.module';
import configuration from './configs/configuration';
import { ConfigModule } from '@nestjs/config';
import { DevicesModule } from './modules/devices/devices.module';
import { StatusesModule } from './modules/statuses/statuses.module';
import { ManufacturersModule } from './modules/manufacturers/manufacturers.module';
import { RecordsModule } from './modules/records/records.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import {TodosModule} from "./modules/todos/todos.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TodosModule,
    RepositoryModule,
    MysqlModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
