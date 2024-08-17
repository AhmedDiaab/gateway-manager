import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Gateway } from "../entities/gateway.entity";
import { Model } from 'mongoose';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsValidIPv4AddressConstraint implements ValidatorConstraintInterface {
    constructor(@InjectModel(Gateway.name) private gateway: Model<Gateway>) { }

    async validate(ipv4: string, args: ValidationArguments) {
        // check if ipv4 associated to another gateway or not
        const count = await this.gateway.countDocuments({ address: ipv4 });
        return !(count > 0)
    }

    defaultMessage(_: ValidationArguments) {
        return `IPv4 is already associated to another gateway`;
    }
}

export function IsValidIPv4Address(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsValidIPv4AddressConstraint,
        });
    };
}