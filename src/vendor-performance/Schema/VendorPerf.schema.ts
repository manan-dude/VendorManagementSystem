import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { IsNumber, Min, Max } from 'class-validator';
import { Vendor } from 'src/vendor/Schema/vendor.schema';

@Schema({
  timestamps: true,
})
export class HistoricalPerformance{
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Vendor', required: true })
  vendor: Vendor;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  @IsNumber()
  @Min(0)
  @Max(100)
  onTimeDeliveryRate: number;

  @Prop({ required: true })
  @IsNumber()
  @Min(0)
  @Max(5)
  qualityRatingAvg: number;

  @Prop({ required: true })
  @IsNumber()
  @Min(0)
  averageResponseTime: number;

  @Prop({ required: true })
  @IsNumber()
  @Min(0)
  @Max(100)
  fulfillmentRate: number;
}

export const HistoricalPerformanceSchema = SchemaFactory.createForClass(HistoricalPerformance);