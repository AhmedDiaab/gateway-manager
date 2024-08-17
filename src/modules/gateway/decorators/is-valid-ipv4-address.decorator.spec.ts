import { Test, TestingModule } from '@nestjs/testing';
import { IsValidIPv4AddressConstraint } from './is-valid-ipv4-address.decorator';
import { Gateway } from '../entities/gateway.entity';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GatewayProvider } from '@mocks/providers/gateway.mock';

describe('IsValidIPv4AddressConstraint', () => {
    let constraint: IsValidIPv4AddressConstraint;
    let gatewayModel: Model<Gateway>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [IsValidIPv4AddressConstraint, GatewayProvider],
        }).compile();

        constraint = module.get<IsValidIPv4AddressConstraint>(IsValidIPv4AddressConstraint);
        gatewayModel = module.get<Model<Gateway>>(getModelToken(Gateway.name));
    });

    it('should return true if IPv4 address is not associated with any gateway', async () => {
        jest.spyOn(gatewayModel, 'countDocuments').mockResolvedValue(0);

        const isValid = await constraint.validate('192.168.1.1', null);

        expect(isValid).toBe(true);
        expect(gatewayModel.countDocuments).toHaveBeenCalledWith({ address: '192.168.1.1' });
    });

    it('should return false if IPv4 address is already associated with another gateway', async () => {
        jest.spyOn(gatewayModel, 'countDocuments').mockResolvedValue(1);

        const isValid = await constraint.validate('192.168.1.1', null);

        expect(isValid).toBe(false);
        expect(gatewayModel.countDocuments).toHaveBeenCalledWith({ address: '192.168.1.1' });
    });

    it('should return the correct default message', () => {
        const message = constraint.defaultMessage(null);
        expect(message).toBe('IPv4 is already associated to another gateway');
    });
});
