import { Prop } from "@nestjs/mongoose";
import { Types, now } from 'mongoose';

export class BaseEntity {
    @Prop({ type: Types.ObjectId })
    _id: string;

    @Prop()
    __v: number;

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: now() })
    updatedAt: Date;
}