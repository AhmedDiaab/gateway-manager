import { mockDeviceModel } from "@mocks/entities/device.mock";
import { Device } from "@modules/device/entities/device.entity";
import { DeviceService } from "@modules/device/device.service";
import { getModelToken } from "@nestjs/mongoose";

export const DeviceProvider = {
    provide: getModelToken(Device.name),
    useValue: mockDeviceModel,
};

export const MockDeviceService = {
    provide: DeviceService,
    useValue: {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        remove: jest.fn(),
    },
};