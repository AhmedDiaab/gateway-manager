import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GatewayResponse } from './dto/gateway.response';

@Controller('gateways')
@ApiTags('Gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create gateway' })
  @ApiOkResponse({ type: GatewayResponse, description: 'Created gateway' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  create(@Body() payload: CreateGatewayDto) {
    return this.gatewayService.create(payload);
  }

  @Get()
  findAll() {
    return this.gatewayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gatewayService.findOne(+id);
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
