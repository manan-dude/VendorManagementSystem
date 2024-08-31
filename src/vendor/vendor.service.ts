import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor } from './Schema/vendor.schema';

@Injectable()
export class VendorService {
  constructor(@InjectModel(Vendor.name) private readonly vendorModel: Model<Vendor>) {}

  async findAll(): Promise<Vendor[]> {
    return await this.vendorModel.find();
  }

  async create(vendor: Vendor): Promise<Vendor> {
    return await this.vendorModel.create(vendor);
  }

  async findByVendorCode(vendorCode: string): Promise<Vendor | null> {
    return await this.vendorModel.findOne({ vendorCode });
  }

  async updateByVendorCode(vendorCode: string, updateData: Partial<Vendor>): Promise<Vendor | null> {
    return await this.vendorModel.findOneAndUpdate({ vendorCode }, updateData, { new: true });
  }

  async deleteByVendorCode(vendorCode: string): Promise<boolean> {
    const result = await this.vendorModel.deleteOne({ vendorCode });
    return result.deletedCount > 0;
  }
}