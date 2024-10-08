import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GatewayResponse } from './dto/gateway.response';
import { Paginatable } from '@lib/classes/paginatable.base';

@Controller('gateways')
@ApiTags('Gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create gateway' })
  @ApiCreatedResponse({ type: GatewayResponse, description: 'Created gateway' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  create(@Body() payload: CreateGatewayDto) {
    return this.gatewayService.create(payload);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List created gateway' })
  @ApiOkResponse({ type: GatewayResponse, description: 'Created gateway' })
  findAll(@Query() filter: Paginatable) {
    return this.gatewayService.findAll(filter);
  }

  @Get(':serial')
  @ApiOperation({ summary: 'Get gateway details by its serial number' })
  @ApiOkResponse({ type: GatewayResponse })
  @ApiParam({ name: 'serial', description: 'Gateway Serial' })
  findOne(@Param('serial') serial: string) {
    return this.gatewayService.findOne(serial);
  }

  @Delete(':serial')
  remove(@Param('serial') serial: string) {
    return this.gatewayService.remove(serial);
  }
}
