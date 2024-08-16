import { mockGatewayModel } from "@mocks/entities/gateway.mock";
import { Gateway } from "@modules/gateway/entities/gateway.entity";
import { getModelToken } from "@nestjs/mongoose";

export const GatewayProvider = {
    provide: getModelToken(Gateway.name),
    useValue: mockGatewayModel,
};