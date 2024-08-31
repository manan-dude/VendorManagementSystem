import { Controller, Get, Post, Put, Delete, Param, Body, Query,UseGuards } from '@nestjs/common';
import { PurchaseOrderService } from './purchaseorder.service';
import { PurchaseOrder } from './Schema/PO.schema';
// import { AuthGuard } from '@nestjs/passport';


@Controller('purchase-orders')
// @UseGuards(AuthGuard('jwt'))
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Post()
  async createPurchaseOrder(@Body() purchaseOrder: PurchaseOrder): Promise<string> {

    try
    {
    await this.purchaseOrderService.createPurchaseOrder(purchaseOrder);
    return "Added PurchaseOrder!!"
    }
    catch(error)
    {
        return error.message
    }
  }

  @Get()
  async getAllPurchaseOrders(
    @Query('vendorCode') vendorCode?: string,
  ): Promise<PurchaseOrder[]> {
    if (vendorCode) {
      return await this.purchaseOrderService.getAllPurchaseOrders(vendorCode);
    } else {
      return await this.purchaseOrderService.getAllPurchaseOrders();
    }
  }

  @Get(':poId')
  async getPurchaseOrderById(@Param('poId') poId: string): Promise<PurchaseOrder | null> {
    return await this.purchaseOrderService.getPurchaseOrderById(poId);
  }

  @Put(':poId')
  async updatePurchaseOrder(
    @Param('poId') poId: string,
    @Body() updateData: Partial<PurchaseOrder>,
  ): Promise<PurchaseOrder | null> {
  
    return await this.purchaseOrderService.updatePurchaseOrder(poId, updateData);
  }

  @Delete(':poId')
  async deletePurchaseOrder(@Param('poId') poId: string): Promise<string> {
    await this.purchaseOrderService.deletePurchaseOrder(poId);
    return "Deleted PO!!"
  }
}