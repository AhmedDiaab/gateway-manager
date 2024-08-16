import { IResponse } from '@lib/interfaces/response.interface';
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let responseObject: IResponse<null>;

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal Server Error';
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        }

        switch (status) {
            case 422:
                responseObject = {
                    status: 'fail',
                    errors: exception.response,
                    message: exception.message,
                };
                status = 400;
                break;
            default:
                // Populate the response based on the IResponse interface
                responseObject = {
                    status: 'fail',
                    message,
                    stack: exception.stack,
                };
                break;
        }

        response.status(status).json(responseObject);
    }
}