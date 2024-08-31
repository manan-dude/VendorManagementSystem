import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import   
 { HistoricalPerformance } from './Schema/VendorPerf.schema';
import { PurchaseOrder } from 'src/purchaseorder/Schema/PO.schema';

@Injectable()
export class HistoricalPerformanceService {
  constructor(
    @InjectModel(HistoricalPerformance.name)
    private readonly historicalPerformanceModel: Model<HistoricalPerformance>,
    @InjectModel(PurchaseOrder.name)
    private readonly purchaseOrderModel: Model<PurchaseOrder>
  ) {}

  async calculatePerformanceMetrics(vendorId: string): Promise<HistoricalPerformance> {
    const completedPurchaseOrders = await this.purchaseOrderModel.find({
      vendor: { _id: vendorId },
      status: 'completed'
    });

    if (completedPurchaseOrders.length === 0) {
      // No completed purchase orders found, skip calculation
      console.log(`No completed purchase orders found for vendor ${vendorId}, skipping performance calculation.`);
      return;
    }

    const onTimeDeliveryRate = this.calculateOnTimeDeliveryRate(completedPurchaseOrders);
    const qualityRatingAvg = this.calculateQualityRatingAvg(completedPurchaseOrders);
    const averageResponseTime = this.calculateAverageResponseTime(completedPurchaseOrders);
    const fulfillmentRate = this.calculateFulfillmentRate(completedPurchaseOrders);
    const newPerformanceData = {
        vendor: vendorId,
        date: new Date(),
        onTimeDeliveryRate,
        qualityRatingAvg,
        averageResponseTime,
        fulfillmentRate,
      };
    
      const newHistoricalPerformance = await this.historicalPerformanceModel.create(newPerformanceData);
    
            return newHistoricalPerformance
  }
 
  private calculateOnTimeDeliveryRate(purchaseOrders: PurchaseOrder[]): number {
    const onTimeCompletedPOs = purchaseOrders.filter(
      (po) => po.deliveryDate <= po.orderDate
    );
    const totalCompletedPOs = purchaseOrders.length;
    return (onTimeCompletedPOs.length / totalCompletedPOs) * 100;
  }

  private calculateQualityRatingAvg(purchaseOrders: PurchaseOrder[]): number {
    const totalQualityRatings = purchaseOrders.reduce(
      (sum, po) => sum + po.qualityRating,
      0
    );
    return totalQualityRatings / purchaseOrders.length;
  }

  private calculateAverageResponseTime(purchaseOrders: PurchaseOrder[]): number {
    const responseTimes = purchaseOrders.map((po) => {
      const timeDifference =
        po.acknowledgmentDate.getTime() - po.issueDate.getTime();
      return timeDifference / (1000 * 60 * 60 * 24); // Convert to days
    });
    return responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
  }

  private calculateFulfillmentRate(purchaseOrders: PurchaseOrder[]): number {
    const fulfilledPOs = purchaseOrders.filter(
      (po) => po.status === 'completed' && !po.issueDate
    );
    return (fulfilledPOs.length / purchaseOrders.length) * 100;
  }
}