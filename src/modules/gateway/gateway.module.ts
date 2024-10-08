import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayDefinition } from './entities/gateway.entity';
import { IsValidIPv4AddressConstraint } from './decorators/is-valid-ipv4-address.decorator';
import { IsValidSerialConstraint } from './decorators/is-valid-serial.decorator';
import { DeviceDefinition } from '@modules/device/entities/device.entity';

@Module({
  imports: [
    MongooseModule.forFeature([GatewayDefinition, DeviceDefinition])
  ],
  controllers: [GatewayController],
  providers: [GatewayService, IsValidIPv4AddressConstraint, IsValidSerialConstraint],
})
export class GatewayModule { }
