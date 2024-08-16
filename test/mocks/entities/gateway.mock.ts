import { mockPaginatableFilter } from "@mocks/shared/filter.mock";

export const mockGateway = {
    _id: 'mockId',
    name: 'Mock Gateway',
    serial: "SampleSerial1",
    address: "192.168.1.1",
};

export const mockGateways = [mockGateway];

export const mockPaginatedGateways = {
    gateways: mockGateways,
    metadata: {
        totalPages: Math.ceil(mockGateways.length / mockPaginatableFilter.items),
        currentPage: mockPaginatableFilter.page,
        count: mockGateways.length,
    },
};


export const mockGatewayModel = {
    create: jest.fn().mockResolvedValue(mockGateway),
    find: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([mockGateway]),
    countDocuments: jest.fn().mockReturnThis(),
    execCount: jest.fn().mockResolvedValue(1),
};
