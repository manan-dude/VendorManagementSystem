import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNumber, Min, Max } from 'class-validator';

@Schema({
  timestamps: true,
})
export class Vendor {
  @Prop({ required: true, type: String })
  @IsString()
  name: string;

  @Prop({ required: true, type: String })
  @IsString()
  email: string;

  @Prop({ required: true, type: String })
  @IsString()
  phone: string;

  @Prop({ required: true, type: String })
  @IsString()
  address: string;

  @Prop({ required: true, type: String, unique: true })
  @IsString()
  vendorCode: string;

  @Prop({ required: true, type: Number })
  @IsNumber()
  @Min(0)
  @Max(100)
  onTimeDeliveryRate: number;

  @Prop({ required: true, type: Number })
  @IsNumber()
  @Min(0)
  @Max(5)
  qualityRatingAvg: number;

  @Prop({ required: true, type: Number })
  @IsNumber()
  @Min(0)
  averageResponseTime: number;

  @Prop({ required: true, type: Number })
  @IsNumber()
  @Min(0)
  @Max(100)
  fulfillmentRate: number;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);