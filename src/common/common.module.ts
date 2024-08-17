import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { cwd } from 'process';
import { ConfigurationNamespaces } from 'src/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [...ConfigurationNamespaces],
            envFilePath: join(cwd(), '.env')
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => config.get('database')
        })
    ]
})
export class CommonModule {};