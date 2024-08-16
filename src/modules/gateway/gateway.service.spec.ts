import { Test, TestingModule } from '@nestjs/testing';
import { GatewayService } from './gateway.service';
import { Model } from 'mongoose';
import { Gateway } from './entities/gateway.entity';
import { GatewayProvider } from '@mocks/providers/gateway.mock';
import { getModelToken } from '@nestjs/mongoose';
import { mockGateway, mockGatewayModel, mockGateways, mockPaginatedGateways } from '@mocks/entities/gateway.mock';
import { Paginatable } from '@lib/classes/paginatable.base';
import { mockPaginatableFilter } from '@mocks/shared/filter.mock';
import { NotFoundException } from '@nestjs/common';

describe('GatewayService', () => {
  let service: GatewayService;
  let model: Model<Gateway>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatewayService, GatewayProvider],
    }).compile();

    service = module.get<GatewayService>(GatewayService);
    model = module.get<Model<Gateway>>(getModelToken(Gateway.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new gateway', async () => {
      const payload = { ...mockGateway };

      const result = await service.create(payload);

      // Check if the save method was called on the created instance
      expect(mockGatewayModel.create).toHaveBeenCalledWith(payload);
      expect(result).toEqual(mockGateway);
    });
  });

  describe('findAll', () => {
    it('should return paginated results and metadata', async () => {
      const skip = (mockPaginatableFilter.page - 1) * mockPaginatableFilter.items;

      jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockGateways),
      } as any);

      jest.spyOn(model, 'countDocuments').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockGateways.length),
      } as any);

      const result = await service.findAll(mockPaginatableFilter);

      expect(result).toEqual(mockPaginatedGateways);

      expect(model.find().skip(skip).limit(mockPaginatableFilter.items).exec).toHaveBeenCalled();
      expect(model.countDocuments().exec).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a gateway if it exists', async () => {
      const serial = 'some-serial';
      const mockGatewayRecord = { ...mockGateway, serial };

      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockGatewayRecord),
      } as any);

      const result = await service.findOne(serial);

      expect(result).toEqual(mockGatewayRecord);
      expect(model.findOne).toHaveBeenCalledWith({ serial });
      expect(model.findOne().exec).toHaveBeenCalled();
    });

    it('should throw a NotFoundException if the gateway does not exist', async () => {
      const serial = 'non-existent-serial';

      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.findOne(serial)).rejects.toThrow(NotFoundException);
      expect(model.findOne).toHaveBeenCalledWith({ serial });
      expect(model.findOne().exec).toHaveBeenCalled();
    });
  });
});
