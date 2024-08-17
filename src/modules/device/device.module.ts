import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { DeviceDefinition } from './entities/device.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayDefinition } from '@modules/gateway/entities/gateway.entity';

@Module({
  imports: [
    MongooseModule.forFeature([DeviceDefinition, GatewayDefinition])
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule { }
