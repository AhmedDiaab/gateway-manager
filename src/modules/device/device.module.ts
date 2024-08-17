import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { DeviceDefinition } from './entities/device.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([DeviceDefinition])
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
