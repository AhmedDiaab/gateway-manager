import { Controller, Get, Post, Body, Param, Delete, UseInterceptors } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ValidateGatewayInterceptor } from '@modules/gateway/interceptors/validate-gateway.interceptor';

@Controller('gateways/:serial/devices')
@ApiTags('Devices')
@ApiParam({ name: 'serial', description: 'Gateway Serial' })
@UseInterceptors(ValidateGatewayInterceptor)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  @Post()
  create(@Param('serial') gateway: string, @Body() payload: CreateDeviceDto) {
    return this.deviceService.create(gateway, payload);
  }

  @Get()
  findAll() {
    return this.deviceService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }
}
