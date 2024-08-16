import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @Get(':id')
  @ApiOperation({ summary: 'Get gateway details by its serial number' })
  @ApiOkResponse({ type: GatewayResponse })
  findOne(@Param('id') id: string) {
    return this.gatewayService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGatewayDto: UpdateGatewayDto) {
    return this.gatewayService.update(+id, updateGatewayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gatewayService.remove(+id);
  }
}
