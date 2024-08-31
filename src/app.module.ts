import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorModule } from './vendor/vendor.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseorderModule } from './purchaseorder/purchaseorder.module';
import { VendorPerformanceModule } from './vendor-performance/vendor-performance.module';
// import { JwtStrategy } from './jwtstrategy/jwtstrategy.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({ secret: 'hard!to-guess_secret' }),
    VendorModule,
    PurchaseorderModule,
    VendorPerformanceModule
  ],
  controllers: [AppController],
  providers: [AppService,  ConfigService],  
})
export class AppModule {}