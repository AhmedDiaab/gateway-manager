import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Gateway } from './entities/gateway.entity';
import { Model } from 'mongoose';
import { Paginatable } from '@lib/classes/paginatable.base';
import { Device } from '@modules/device/entities/device.entity';

@Injectable()
export class GatewayService {
  constructor(
    @InjectModel(Gateway.name) private gateway: Model<Gateway>,
    @InjectModel(Device.name) private device: Model<Device>,
  ) { }

  create(payload: CreateGatewayDto) {
    return this.gateway.create(payload)
  }

  async findAll(filter: Paginatable) {
    const { items, page } = filter;
    const skip = (page - 1) * items;
    const recordsPromise = this.gateway.find().skip(skip).limit(items).exec();

    const countPromise = this.gateway.countDocuments().exec();

    const [records, count] = await Promise.all([recordsPromise, countPromise]);

    const metadata = {
      totalPages: Math.ceil(count / items),
      currentPage: page,
      count,
    }
    return { gateways: records, metadata };
  }

  async findOne(serial: string) {
    const record = await this.gateway.findOne({ serial }).exec();
    if (!record) throw new NotFoundException();
    return record;
  }

  async remove(serial: string) {
    const record = await this.gateway.findOne({ serial }).exec();
    if (!record) throw new NotFoundException();
    await this.device.deleteMany({ gateway: record.serial }).exec();
    await record.deleteOne();
  }
}
