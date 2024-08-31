import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNumber, Min, Max } from 'class-validator';
import * as mongoose from 'mongoose';
import { Vendor } from 'src/vendor/Schema/vendor.schema';

export type PurchaseOrderStatus = 'pending' | 'completed' | 'canceled';

export interface PurchaseOrderItem {
  itemId: string;
  quantity: number;
  price: number;
}

@Schema({
  timestamps: true,
})
export class PurchaseOrder {
  @Prop({ required: true, unique: true })
  @IsString()
  poNumber: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Vendor' })
  vendor: Vendor;

  @Prop({ required: true })
  orderDate: Date;

  @Prop()
  deliveryDate: Date;

  @Prop()
  items: PurchaseOrderItem[];

  @Prop({ required: true })
  @IsNumber()
  @Min(1)
  quantity: number;

  @Prop({ required: true, enum: ['pending', 'completed', 'canceled'] })
  status: PurchaseOrderStatus;

  @Prop()
  @Min(0)
  @Max(5)
  qualityRating: number;

  @Prop()
  issueDate: Date;

  @Prop()
  acknowledgmentDate: Date;
}

export const PurchaseOrderSchema = SchemaFactory.createForClass(PurchaseOrder);