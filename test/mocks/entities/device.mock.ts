export const mockDevicePayload = {
    uid: 1,
    vendor: "Sample Vendor",
    status: "online",
}

export const mockDevice = {
    _id: "mockId",
    ...mockDevicePayload,
    save: jest.fn(),
    deleteOne: jest.fn(),
};

export const mockDevices = [mockDevice];


export const mockDeviceModel = {
    create: jest.fn().mockResolvedValue(mockDevice),
    find: jest.fn().mockResolvedValue(mockDevices),
    findOne: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockDevice),
    }),
    countDocuments: jest.fn(),
    deleteMany: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockDevice),
    })
};
