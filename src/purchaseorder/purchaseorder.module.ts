import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseOrderSchema,PurchaseOrder } from './Schema/PO.schema';
import { PurchaseOrderController } from './purchaseorder.controller';
import { PurchaseOrderService } from './purchaseorder.service';

@Module({
  imports:[
    MongooseModule.forFeature([{name:PurchaseOrder.name,schema:PurchaseOrderSchema}])
  ],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService]
})
export class PurchaseorderModule {}
