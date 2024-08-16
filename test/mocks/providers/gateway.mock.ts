import { mockGatewayModel } from "@mocks/entities/gateway.mock";
import { Gateway } from "@modules/gateway/entities/gateway.entity";
import { GatewayService } from "@modules/gateway/gateway.service";
import { getModelToken } from "@nestjs/mongoose";

export const GatewayProvider = {
    provide: getModelToken(Gateway.name),
    useValue: mockGatewayModel,
};

export const MockGatewayService = {
    provide: GatewayService,
    useValue: {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        remove: jest.fn(),
    },
};