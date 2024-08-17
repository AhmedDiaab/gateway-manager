import { Test, TestingModule } from '@nestjs/testing';
import { IsValidSerialConstraint } from './is-valid-serial.decorator'; // Adjust path as needed
import { Gateway } from '../entities/gateway.entity';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GatewayProvider } from '@mocks/providers/gateway.mock';

describe('IsValidSerialConstraint', () => {
    let constraint: IsValidSerialConstraint;
    let gatewayModel: Model<Gateway>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [IsValidSerialConstraint, GatewayProvider],
        }).compile();

        constraint = module.get<IsValidSerialConstraint>(IsValidSerialConstraint);
        gatewayModel = module.get<Model<Gateway>>(getModelToken(Gateway.name));
    });

    it('should return true if serial is not associated with any gateway', async () => {
        jest.spyOn(gatewayModel, 'countDocuments').mockResolvedValue(0);

        const isValid = await constraint.validate('ABC123', null);

        expect(isValid).toBe(true);
        expect(gatewayModel.countDocuments).toHaveBeenCalledWith({ serial: 'ABC123' });
    });

    it('should return false if serial is already associated with another gateway', async () => {
        jest.spyOn(gatewayModel, 'countDocuments').mockResolvedValue(1);

        const isValid = await constraint.validate('ABC123', null);

        expect(isValid).toBe(false);
        expect(gatewayModel.countDocuments).toHaveBeenCalledWith({ serial: 'ABC123' });
    });

    it('should return the correct default message', () => {
        const message = constraint.defaultMessage(null);
        expect(message).toBe('This serial is already associated to another gateway');
    });
});
