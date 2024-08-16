import { Injectable } from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Gateway } from './entities/gateway.entity';
import { Model } from 'mongoose';
import { Paginatable } from '@lib/classes/paginatable.base';

@Injectable()
export class GatewayService {
  constructor(@InjectModel(Gateway.name) private gateway: Model<Gateway>) { }

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

  findOne(id: number) {
    return `This action returns a #${id} gateway`;
  }

  update(id: number, updateGatewayDto: UpdateGatewayDto) {
    return `This action updates a #${id} gateway`;
  }

  remove(id: number) {
    return `This action removes a #${id} gateway`;
  }
}
