import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Gateway } from "../entities/gateway.entity";
import { Model } from 'mongoose';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsValidSerialConstraint implements ValidatorConstraintInterface {
    constructor(@InjectModel(Gateway.name) private gateway: Model<Gateway>) { }

    async validate(serial: string, args: ValidationArguments) {
        // check if serial associated to another gateway or not
        const count = await this.gateway.countDocuments({ serial: serial });
        return !(count > 0)
    }

    defaultMessage(_: ValidationArguments) {
        return `This serial is already associated to another gateway`;
    }
}

export function IsValidSerial(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsValidSerialConstraint,
        });
    };
}