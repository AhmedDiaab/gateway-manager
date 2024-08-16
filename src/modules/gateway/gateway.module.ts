import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayDefinition } from './entities/gateway.entity';

@Module({
  imports: [
    MongooseModule.forFeature([GatewayDefinition])
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule { }
