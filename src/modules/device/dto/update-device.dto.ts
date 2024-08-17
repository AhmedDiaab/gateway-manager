import { PickType } from '@nestjs/swagger';
import { CreateDeviceDto } from './create-device.dto';

export class UpdateDeviceDto extends PickType(CreateDeviceDto, ['status']) { }
