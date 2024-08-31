import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hi My Name is Manan Jain and I am a Backend Developer !!!';
  }
}
