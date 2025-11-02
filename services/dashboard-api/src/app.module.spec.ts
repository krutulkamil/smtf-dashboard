import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should compile AppModule', () => {
    expect(moduleRef).toBeDefined();
  });

  it('should resolve AppService from the module injector and return greeting', () => {
    const service = moduleRef.get<AppService>(AppService);
    expect(service).toBeInstanceOf(AppService);
    expect(service.getHello()).toBe(
      'Hello to the BE side of the assignment! Please enter /dashboard to see the dashboard data.',
    );
  });
});
