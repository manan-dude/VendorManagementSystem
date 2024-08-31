import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { Vendor } from './Schema/vendor.schema';
import { response } from 'express';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  async createVendor(@Body() vendor: Vendor): Promise<String> {
    try {
        const response = await this.vendorService.create(vendor)
      return "Vendor Added!";
    } catch (error) {
      return error.message
      }
    }
  

  @Get()
  async findAll(): Promise<Vendor[]> {
    return await this.vendorService.findAll();
  }

  @Get(':vendorCode')
  async findByVendorCode(@Param('vendorCode') vendorCode: string): Promise<Vendor> {
    return await this.vendorService.findByVendorCode(vendorCode);
  }

  @Put(':vendorCode')
  async updateByVendorCode(
    @Param('vendorCode') vendorCode: string,
    @Body() updateData: Partial<Vendor>,
  ): Promise<string> {
    await this.vendorService.updateByVendorCode(vendorCode, updateData);
    return "Updated!!"
  }

  @Delete(':vendorCode')
  async deleteByVendorCode(@Param('vendorCode') vendorCode: string): Promise<string> {
    try {
      await this.vendorService.deleteByVendorCode(vendorCode);
      return "Deleted"
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException for consistency
      } else {
        throw new Error('An error occurred while deleting the vendor'); // Handle other errors
      }
    }
  }
}