
import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';


@Schema({ timestamps: true })
export class Company {

  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  description?: string;


  @Prop()
  address?: string;

  @Prop({ default: 0 })
  numberOfEmployees?: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;




}

