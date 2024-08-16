import { Injectable } from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Gateway } from './entities/gateway.entity';
import { Model } from 'mongoose';

@Injectable()
export class GatewayService {
  constructor(@InjectModel(Gateway.name) private gateway: Model<Gateway>) { }

  create(payload: CreateGatewayDto) {
    let record = new this.gateway(payload);
    return record.save();
  }

  findAll() {
    return `This action returns all gateway`;
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
