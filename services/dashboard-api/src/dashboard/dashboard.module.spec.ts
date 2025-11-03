import { Test, TestingModule } from '@nestjs/testing';
import { DashboardModule } from './dashboard.module';
import { DashboardController } from './dashboard.controller';

describe('DashboardModule', () => {
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [DashboardModule],
    }).compile();
  });

  it('should compile DashboardModule', () => {
    expect(moduleRef).toBeDefined();
  });

  it('should resolve DashboardController from the module injector', () => {
    const controller = moduleRef.get<DashboardController>(DashboardController);
    expect(controller).toBeInstanceOf(DashboardController);
    expect(typeof controller.getDashboard).toBe('function');
  });
});
