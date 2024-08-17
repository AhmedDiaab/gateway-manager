import { Test, TestingModule } from '@nestjs/testing';
import { ValidateGatewayInterceptor } from './validate-gateway.interceptor';
import { Model } from 'mongoose';
import { Gateway } from '@modules/gateway/entities/gateway.entity';
import { Device } from '../entities/device.entity';
import { GatewayProvider } from '@mocks/providers/gateway.mock';
import { DeviceProvider } from '@mocks/providers/device.mock';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, CallHandler, ExecutionContext, NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';

describe('ValidateGatewayInterceptor', () => {
    let interceptor: ValidateGatewayInterceptor;
    let gatewayModel: Model<Gateway>;
    let deviceModel: Model<Device>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ValidateGatewayInterceptor, GatewayProvider, DeviceProvider],
        }).compile();

        interceptor = module.get<ValidateGatewayInterceptor>(ValidateGatewayInterceptor);
        gatewayModel = module.get<Model<Gateway>>(getModelToken(Gateway.name));
        deviceModel = module.get<Model<Device>>(getModelToken(Device.name));
    });

    it('should throw NotFoundException if gateway does not exist', async () => {
        jest.spyOn(gatewayModel, 'countDocuments').mockResolvedValue(0);

        const mockExecutionContext = {
            switchToHttp: () => ({
                getRequest: () => ({
                    params: { serial: 'invalidSerial' },
                    method: 'GET',
                }),
            }),
        } as unknown as ExecutionContext;

        const next: CallHandler = {
            handle: jest.fn(() => of({})),
        };

        await expect(interceptor.intercept(mockExecutionContext, next)).rejects.toThrow(NotFoundException);
        expect(gatewayModel.countDocuments).toHaveBeenCalledWith({ serial: 'invalidSerial' });
    });

    it('should throw BadRequestException if gateway has maximum devices and method is POST', async () => {
        jest.spyOn(gatewayModel, 'countDocuments').mockResolvedValue(1);
        jest.spyOn(deviceModel, 'countDocuments').mockResolvedValue(10);

        const mockExecutionContext = {
            switchToHttp: () => ({
                getRequest: () => ({
                    params: { serial: 'validSerial' },
                    method: 'POST',
                }),
            }),
        } as unknown as ExecutionContext;

        const next: CallHandler = {
            handle: jest.fn(() => of({})),
        };

        await expect(interceptor.intercept(mockExecutionContext, next)).rejects.toThrow(BadRequestException);
        expect(deviceModel.countDocuments).toHaveBeenCalledWith({ gateway: 'validSerial' });
    });

    it('should call next.handle() if all checks pass', async () => {
        jest.spyOn(gatewayModel, 'countDocuments').mockResolvedValue(1);
        jest.spyOn(deviceModel, 'countDocuments').mockResolvedValue(5);

        const mockExecutionContext = {
            switchToHttp: () => ({
                getRequest: () => ({
                    params: { serial: 'validSerial' },
                    method: 'POST',
                }),
            }),
        } as unknown as ExecutionContext;

        const next: CallHandler = {
            handle: jest.fn(() => of({})),
        };

        await interceptor.intercept(mockExecutionContext, next);
        expect(next.handle).toHaveBeenCalled();
    });
});