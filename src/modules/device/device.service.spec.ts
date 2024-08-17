import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from './device.service';
import { Model } from 'mongoose';
import { Device } from './entities/device.entity';
import { getModelToken } from '@nestjs/mongoose';
import { CreateDeviceDto } from './dto/create-device.dto';
import { mockDevice, mockDevicePayload } from '@mocks/entities/device.mock';
import { DeviceProvider } from '@mocks/providers/device.mock';

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


});
