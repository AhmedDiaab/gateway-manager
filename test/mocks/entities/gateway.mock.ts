export const mockGateway = {
    _id: 'mockId',
    name: 'Mock Gateway',
    serial: "SampleSerial1",
    address: "192.168.1.1",
};


export const mockGatewayModel = {
    create: jest.fn().mockResolvedValue(mockGateway),
};