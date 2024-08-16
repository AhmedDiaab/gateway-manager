import { registerAs } from "@nestjs/config";
import { IsNotEmpty, IsString } from "class-validator"
import { BaseConfig } from "@lib/classes/config.base";
import { env } from 'process';
import { ValidateConfig } from "@lib/utils/config-validation.util";
import { MongooseModuleFactoryOptions } from "@nestjs/mongoose";

export class DatabaseConfiguration extends BaseConfig {
    @IsString()
    @IsNotEmpty()
    DB_URI: string;

    @IsString()
    @IsNotEmpty()
    DB_NAME: string;
}


export default registerAs('database', (): MongooseModuleFactoryOptions => {
    const config = {
        DB_URI: env.DB_URI,
        DB_NAME: env.DB_NAME
    }

    ValidateConfig(DatabaseConfiguration, config);
    
    return {
        uri: env.DB_URI,
        dbName: env.DB_NAME
    }
});