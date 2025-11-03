import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello to the BE side of the assignment! Please enter /dashboard to see the dashboard data.';
  }
}
