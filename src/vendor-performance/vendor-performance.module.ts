import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseOrderSchema } from 'src/purchaseorder/Schema/PO.schema';
import { HistoricalPerformanceService } from './vendor-performance.service';
import { HistoricalPerformanceSchema } from './Schema/VendorPerf.schema';
import { VendorPerformanceController } from './vendor-performance.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'HistoricalPerformance', schema: HistoricalPerformanceSchema },
      { name: 'PurchaseOrder', schema: PurchaseOrderSchema } 
    ])
  ],
  controllers: [VendorPerformanceController],
  providers: [HistoricalPerformanceService]
})
export class VendorPerformanceModule {}