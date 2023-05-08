import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { buildDataSourceOptions } from './database.provider';

ConfigModule.forRoot({
    isGlobal: true,
}) 

export default new DataSource(buildDataSourceOptions(new ConfigService()));
