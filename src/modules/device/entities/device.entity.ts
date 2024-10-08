import { BaseEntity } from "@lib/classes/entity.base";
import { Gateway } from "@modules/gateway/entities/gateway.entity";
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { StatusType } from "../types/status.type";

export type DeviceDocument = HydratedDocument<Device>;
@Schema()
export class Device extends BaseEntity {
    @Prop()
    uid: number;

    @Prop()
    vendor: string;

    @Prop()
    status: StatusType;

    @Prop({ ref: Gateway.name })
    gateway: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);

export const DeviceDefinition: ModelDefinition = { name: Device.name, schema: DeviceSchema };