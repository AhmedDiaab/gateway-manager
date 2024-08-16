import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type GatewayDocument = HydratedDocument<Gateway>;

@Schema()
export class Gateway {
    @Prop()
    serial: string;

    @Prop()
    name: string;

    @Prop()
    address: string;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);

export const GatewayDefinition: ModelDefinition = { name: Gateway.name, schema: GatewaySchema };