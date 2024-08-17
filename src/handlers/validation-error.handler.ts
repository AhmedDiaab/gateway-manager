import { IErrorResponse } from "@lib/interfaces/response.interface";
import { ValidationError } from "@nestjs/common";
import { ValidationException } from "src/exceptions/validation.exception";

export function handleValidationErrors(errors: ValidationError[]): ValidationException {
    const result: IErrorResponse[] = [];

    const processError = (error: ValidationError, parentProperty = '') => {
        if (error.constraints) {
            for (const [key, value] of Object.entries(error.constraints)) {
                result.push({
                    field: `${parentProperty}${error.property}`,
                    message: value,
                });
            }
        }

        if (error.children) {
            for (const childError of error.children) {
                processError(childError, `${parentProperty}${error.property}.`);
            }
        }
    };

    for (const error of errors) {
        processError(error);
    }

    return new ValidationException(result);
};