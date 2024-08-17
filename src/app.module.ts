import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { Modules } from '@modules/index';
import { DeviceModule } from './modules/device/device.module';

@Module({
  imports: [
    CommonModule,
    GatewayModule,
    ...Modules,
    DeviceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
