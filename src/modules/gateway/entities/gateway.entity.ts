import { BaseEntity } from '@lib/classes/entity.base';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GatewayDocument = HydratedDocument<Gateway>;

@Schema()
export class Gateway extends BaseEntity {
    @Prop()
    serial: string;

    @Prop()
    name: string;

    @Prop()
    address: string;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);

export const GatewayDefinition: ModelDefinition = { name: Gateway.name, schema: GatewaySchema };