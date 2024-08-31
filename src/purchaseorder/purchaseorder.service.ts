import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PurchaseOrder } from './Schema/PO.schema';

@Injectable()
export class PurchaseOrderService {
  constructor(@InjectModel(PurchaseOrder.name) private readonly purchaseOrderModel: Model<PurchaseOrder>) {}

  async createPurchaseOrder(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder> {
    return await this.purchaseOrderModel.create(purchaseOrder);
  }

  async getAllPurchaseOrders(vendorCode?: string): Promise<PurchaseOrder[]> {
    if (vendorCode) {
      return await this.purchaseOrderModel.find({ vendor: vendorCode });
    } else {
      return await this.purchaseOrderModel.find();
    }
  }

  async getPurchaseOrderById(poNumber: string): Promise<PurchaseOrder | null> {
    return await this.purchaseOrderModel.findOne({poNumber});
  }

  async updatePurchaseOrder(poNumber: string, updateData: Partial<PurchaseOrder>): Promise<PurchaseOrder | null> {
    return await this.purchaseOrderModel.findOneAndUpdate({poNumber}, updateData, { new: true });
  }

  async deletePurchaseOrder(poNumber: string): Promise<void> {
    await this.purchaseOrderModel.deleteOne({poNumber});
  }
}