import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from './entities/device.entity';
import { Model } from 'mongoose';

@Injectable()
export class DeviceService {
  constructor(@InjectModel(Device.name) private device: Model<Device>) { }

  create(gateway: string, payload: CreateDeviceDto) {
    return this.device.create({ gateway, ...payload });
  }

  findAll(gateway: string) {
    return this.device.find({ gateway });
  }

  async update(gateway: string, id: string, payload: UpdateDeviceDto) {
    const record = await this.device.findOne({ _id: id, gateway }).exec();
    if (!record) throw new NotFoundException();
    record.status = payload.status;
    await record.save();
  }

  async remove(gateway: string, id: string) {
    const record = await this.device.findOne({ _id: id, gateway }).exec();
    if (!record) throw new NotFoundException();
    await record.deleteOne();
  }
}
