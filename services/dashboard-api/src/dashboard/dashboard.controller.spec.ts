import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardResponseSchema } from '@smtf/schemas';

describe('DashboardController', () => {
  let controller: DashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getDashboard should return a valid DashboardResponse with deterministic timestamps', () => {
    const fixedDate = new Date('2025-01-02T12:00:00.000Z');
    jest.useFakeTimers().setSystemTime(fixedDate);
    const fixedNow = fixedDate.getTime();

    const result = controller.getDashboard();

    const parsed = DashboardResponseSchema.safeParse(result);
    expect(parsed.success).toBe(true);

    expect(result).toEqual({
      revenueToday: 12345.67,
      activeUsers: 842,
      conversionRate: 0.0345,
      trend: [
        {
          timestamp: new Date(fixedNow - 3600 * 1000 * 3).toISOString(),
          revenue: 2100,
          users: 160,
          conversions: 5,
        },
        {
          timestamp: new Date(fixedNow - 3600 * 1000 * 2).toISOString(),
          revenue: 2500,
          users: 180,
          conversions: 6,
        },
        {
          timestamp: new Date(fixedNow - 3600 * 1000).toISOString(),
          revenue: 3100,
          users: 210,
          conversions: 7,
        },
        {
          timestamp: new Date(fixedNow).toISOString(),
          revenue: 3645.67,
          users: 220,
          conversions: 8,
        },
      ],
    });

    jest.useRealTimers();
  });

  it('getDashboard should throw HttpException with issues when internal validation fails', () => {
    const issues = [
      {
        code: 'custom',
        message: 'Simulated validation failure',
        path: ['revenueToday'],
      },
    ];

    const schemaSpy = jest
      .spyOn(DashboardResponseSchema, 'safeParse')
      .mockReturnValue({ success: false, error: { issues } } as any);

    try {
      controller.getDashboard();
      // if no error is thrown, fail the test
      fail('Expected HttpException to be thrown');
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      const ex = e as HttpException;
      expect(ex.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      const response = ex.getResponse();
      expect(response).toMatchObject({
        message: 'Internal data validation failed',
        issues,
      });
    } finally {
      schemaSpy.mockRestore();
    }
  });
});
