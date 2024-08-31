import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { HistoricalPerformanceService } from './vendor-performance.service';


@Controller('vendors')
export class VendorPerformanceController {
  constructor(private readonly historicalPerformanceService: HistoricalPerformanceService) {}

  @Get(':vendorId/performance')
  async getVendorPerformanceMetrics(@Param('vendorId') vendorId: string): Promise<any> {
    const performanceMetrics = await this.historicalPerformanceService.calculatePerformanceMetrics(vendorId);
    return performanceMetrics;
  }
}