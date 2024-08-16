import { registerAs } from "@nestjs/config";
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl, Max, Min } from "class-validator"
import { BaseConfig } from "@lib/classes/config.base";
import { env } from 'process';
import { ValidateConfig } from "@lib/utils/config-validation.util";

export type Environment = 'development' | 'production';
enum EnvironmentEnvironment {
    Development = 'development',
    Staging = 'staging',
    Production = 'production'
}

export class ServerConfiguration extends BaseConfig {
    @IsEnum(EnvironmentEnvironment)
    NODE_ENV: Environment;

    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number = 3000;

    @IsString()
    @IsNotEmpty()
    APP_NAME: string;

    @IsString()
    APP_URL: string;
}


export default registerAs('server', () => {

    const config = {
        NODE_ENV: env.NODE_ENV,
        PORT: +env.PORT,
        APP_NAME: env.APP_NAME,
        APP_URL: env.APP_URL
    }

    return ValidateConfig(ServerConfiguration, config);
});