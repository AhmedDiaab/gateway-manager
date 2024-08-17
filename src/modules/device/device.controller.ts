import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, Patch } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ValidateGatewayInterceptor } from '@modules/device/interceptors/validate-gateway.interceptor';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceResponse } from './dto/device.response';

@Controller('gateways/:serial/devices')
@ApiTags('Devices')
@ApiParam({ name: 'serial', description: 'Gateway Serial' })
@UseInterceptors(ValidateGatewayInterceptor)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  @Post()
  @ApiOperation({ summary: 'Add device' })
  @ApiCreatedResponse({ type: DeviceResponse })
  create(@Param('serial') gateway: string, @Body() payload: CreateDeviceDto) {
    return this.deviceService.create(gateway, payload);
  }

  @Get()
  @ApiOperation({ summary: 'List all devices for gateway' })
  @ApiOkResponse({ type: DeviceResponse, isArray: true })
  findAll(@Param('serial') gateway: string,) {
    return this.deviceService.findAll(gateway);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update device status' })
  @ApiOkResponse()
  toggleStatus(@Param('serial') gateway: string, @Param('id') id: string, @Body() payload: UpdateDeviceDto) {
    return this.deviceService.update(gateway, id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete device' })
  @ApiOkResponse()
  remove(@Param('serial') gateway: string, @Param('id') id: string) {
    return this.deviceService.remove(gateway, id);
  }
}
