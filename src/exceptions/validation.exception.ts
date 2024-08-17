import { HttpException } from '@nestjs/common';

export class ValidationException extends HttpException {
    constructor(payload: Record<string, any>) {
        super(payload, 422);
    }
}