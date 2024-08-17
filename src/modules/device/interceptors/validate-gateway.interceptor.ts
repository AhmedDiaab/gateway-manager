import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gateway } from '../../gateway/entities/gateway.entity';
import { Device } from '../entities/device.entity';

@Injectable()
export class ValidateGatewayInterceptor implements NestInterceptor {
    constructor(
        @InjectModel(Gateway.name) private gateway: Model<Gateway>,
        @InjectModel(Device.name) private device: Model<Device>,
    ) { }
    async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
        // get request
        const request = context.switchToHttp().getRequest();

        // extract gateway from route parameter
        const serial = request.params.serial;

        // extract method
        const method = request.method;

        // check if gateway exists then if not throw exception
        const countPromise = this.gateway.countDocuments({ serial });
        const devicesPromise = this.device.countDocuments({ gateway: serial });

        const [count, devices] = await Promise.all([countPromise, devicesPromise]);

        if (count === 0) throw new NotFoundException('Gateway Not exist');

        if (devices === 10 && method === 'POST') throw new BadRequestException('Gateway maximum attached devices is 10');

        return next.handle();
    }
}