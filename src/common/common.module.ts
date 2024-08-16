import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { join } from 'path';
import { cwd } from 'process';
import { ConfigurationNamespaces } from 'src/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [...ConfigurationNamespaces],
            envFilePath: join(cwd(), '.env')
        })
    ]
})
export class CommonModule {};