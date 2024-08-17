import { Test, TestingModule } from '@nestjs/testing';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { DeviceProvider, MockDeviceService } from '@mocks/providers/device.mock';
import { GatewayProvider } from '@mocks/providers/gateway.mock';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DeviceResponse } from './dto/device.response';
import { mockDevice, mockDevicePayload } from '@mocks/entities/device.mock';
import { UpdateDeviceDto } from './dto/update-device.dto';

describe('DeviceController', () => {
  let controller: DeviceController;
  let service: DeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceController],
      providers: [MockDeviceService, GatewayProvider, DeviceProvider],
    }).compile();

    controller = module.get<DeviceController>(DeviceController);
    service = module.get<DeviceService>(DeviceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call DeviceService.create and return the result', async () => {
      const gateway = 'someSerial';
      const payload = mockDevicePayload as CreateDeviceDto;
      jest.spyOn(service, 'create').mockResolvedValue(mockDevice as any);

      const result = await controller.create(gateway, payload);

      expect(service.create).toHaveBeenCalledWith(gateway, payload);
      expect(result).toEqual(mockDevice);
    });
  });

  describe('findAll', () => {
    it('should call DeviceService.findAll and return the result', async () => {
      const gateway = 'someSerial';
      const expectedResult = [
        { _id: '1', gateway, vendor: 'Device Vendor', status: 'online' },
        { _id: '2', gateway, vendor: 'Another Vendor', status: 'offline' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult as any);

      const result = await controller.findAll(gateway);

      expect(service.findAll).toHaveBeenCalledWith(gateway);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('toggleStatus', () => {
    it('should call DeviceService.update and return the result', async () => {
      const gateway = 'someSerial';
      const id = '1';
      const payload: UpdateDeviceDto = { status: 'offline' };

      const result = await controller.toggleStatus(gateway, id, payload);

      expect(service.update).toHaveBeenCalledWith(gateway, id, payload);
      expect(result).toBeUndefined();  // Since the controller method doesn't return a value
    });
  });

  describe('remove', () => {
    it('should call DeviceService.remove and return the result', async () => {
      const gateway = 'someSerial';
      const id = '1';

      const result = await controller.remove(gateway, id);

      expect(service.remove).toHaveBeenCalledWith(gateway, id);
      expect(result).toBeUndefined();  // Since the controller method doesn't return a value
    });
  });
});
