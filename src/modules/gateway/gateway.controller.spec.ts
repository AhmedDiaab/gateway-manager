import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { MockGatewayService } from '@mocks/providers/gateway.mock';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { mockGateway, mockGatewayPayload, mockPaginatedGateways } from '@mocks/entities/gateway.mock';
import { Paginatable } from '@lib/classes/paginatable.base';
import { NotFoundException } from '@nestjs/common';

describe('GatewayController', () => {
  let controller: GatewayController;
  let service: GatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [MockGatewayService],
    }).compile();

    controller = module.get<GatewayController>(GatewayController);
    service = module.get<GatewayService>(GatewayService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a gateway', async () => {
      const payload: CreateGatewayDto = mockGatewayPayload;
      jest.spyOn(service, 'create').mockResolvedValue(mockGateway as any);

      const result = await controller.create(payload);

      expect(result).toEqual(mockGateway);
      expect(service.create).toHaveBeenCalledWith(payload);
    });
  });

  describe('findAll', () => {
    it('should return paginated results', async () => {
      const filter = { page: 1, items: 10 } as Paginatable;
      jest.spyOn(service, 'findAll').mockResolvedValue(mockPaginatedGateways as any);

      const result = await controller.findAll(filter);

      expect(result).toEqual(mockPaginatedGateways);
      expect(service.findAll).toHaveBeenCalledWith(filter);
    });
  });

  describe('findOne', () => {
    it('should return a gateway if found', async () => {
      const serial = 'some-serial';
      jest.spyOn(service, 'findOne').mockResolvedValue(mockGateway as any);

      const result = await controller.findOne(serial);

      expect(result).toEqual(mockGateway);
      expect(service.findOne).toHaveBeenCalledWith(serial);
    });

    it('should throw a NotFoundException if the gateway is not found', async () => {
      const serial = 'non-existent-serial';
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(serial)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(serial);
    });
  });

  describe('remove', () => {
    it('should remove a gateway if found', async () => {
      const serial = 'some-serial';
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      const result = await controller.remove(serial);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(serial);
    });

    it('should throw a NotFoundException if the gateway is not found', async () => {
      const serial = 'non-existent-serial';
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(serial)).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(serial);
    });
  });
});
