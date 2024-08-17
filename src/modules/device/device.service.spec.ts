import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from './device.service';
import { Model } from 'mongoose';
import { Device } from './entities/device.entity';
import { getModelToken } from '@nestjs/mongoose';
import { CreateDeviceDto } from './dto/create-device.dto';
import { mockDevice, mockDevicePayload, mockDevices } from '@mocks/entities/device.mock';
import { DeviceProvider } from '@mocks/providers/device.mock';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { StatusType } from './types/status.type';
import { NotFoundException } from '@nestjs/common';

describe('DeviceService', () => {
  let service: DeviceService;
  let model: Model<Device>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceService, DeviceProvider],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
    model = module.get<Model<Device>>(getModelToken(Device.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new device', async () => {
      const payload = mockDevicePayload as CreateDeviceDto;
      const result = await service.create('someGatewayId', payload);

      expect(model.create).toHaveBeenCalledWith({
        gateway: 'someGatewayId',
        ...payload,
      });
      expect(result).toEqual(mockDevice);
    });
  });

  describe('findAll', () => {
    it('should return all devices for a gateway', async () => {
      const result = await service.findAll('someGatewayId');

      expect(model.find).toHaveBeenCalledWith({ gateway: 'someGatewayId' });
      expect(result).toEqual(mockDevices);
    });
  });

  describe('update', () => {
    it('should update the device status', async () => {
      const payload: UpdateDeviceDto = { status: 'inactive' as StatusType };
      await service.update('someGatewayId', 'someDeviceId', payload);

      expect(model.findOne).toHaveBeenCalledWith({ _id: 'someDeviceId', gateway: 'someGatewayId' });
      expect(mockDevice.save).toHaveBeenCalled();
      expect(mockDevice.status).toBe(payload.status);
    });

    it('should throw NotFoundException if device not found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.update('someGatewayId', 'invalidDeviceId', { status: 'inactive' as StatusType }))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the device', async () => {
      await service.remove('someGatewayId', 'someDeviceId');

      expect(model.findOne).toHaveBeenCalledWith({ _id: 'someDeviceId', gateway: 'someGatewayId' });
      expect(mockDevice.deleteOne).toHaveBeenCalled();
    });

    it('should throw NotFoundException if device not found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.remove('someGatewayId', 'invalidDeviceId'))
        .rejects
        .toThrow(NotFoundException);
    });
  });
});
