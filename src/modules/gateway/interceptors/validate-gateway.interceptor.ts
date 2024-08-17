import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gateway } from '../entities/gateway.entity';

@Injectable()
export class ValidateGatewayInterceptor implements NestInterceptor {
    constructor(@InjectModel(Gateway.name) private gateway: Model<Gateway>) { }
    async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
        // get request
        const request = context.switchToHttp().getRequest();

        // extract gateway from route parameter
        const serial = request.params.gateway;

        // check if gateway exists then if not throw exception
        const count = await this.gateway.countDocuments({ serial });

        if (count === 0) throw new NotFoundException('Gateway Not exist');

        return next.handle();
    }
}