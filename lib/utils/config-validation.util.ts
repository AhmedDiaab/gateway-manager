import { ClassConstructor, plainToInstance } from "class-transformer";
import { ValidationError, validateSync } from "class-validator";
import { BaseConfig } from "@lib/classes/config.base";


export function ValidateConfig(configClass: ClassConstructor<BaseConfig>, instance: BaseConfig): BaseConfig {
    const validateSchema = plainToInstance(configClass, instance, { enableImplicitConversion: true })

    const errors: ValidationError[] = validateSync(validateSchema, { skipMissingProperties: false });

    if (errors.length > 0) {
        const errorMessages = errors.map(error => Object.values(error.constraints || {}).join(", ")).join(", ");
        throw new Error(`Validation failed: ${errorMessages}`);
    }

    return instance;
}