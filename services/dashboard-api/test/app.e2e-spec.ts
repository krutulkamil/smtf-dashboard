import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { DashboardResponseSchema } from '@smtf/schemas';

describe('Dashboard e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET / should return greeting', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(
        'Hello to the BE side of the assignment! Please enter /dashboard to see the dashboard data.',
      );
  });

  it('GET /dashboard should return valid DashboardResponse JSON', async () => {
    const res = await request(app.getHttpServer())
      .get('/dashboard')
      .expect(200);

    expect(res.headers['content-type']).toMatch(/json/);

    const parsed = DashboardResponseSchema.safeParse(res.body);
    expect(parsed.success).toBe(true);

    if (parsed.success) {
      // basic invariants
      expect(typeof parsed.data.revenueToday).toBe('number');
      expect(typeof parsed.data.activeUsers).toBe('number');
      expect(typeof parsed.data.conversionRate).toBe('number');
      expect(Array.isArray(parsed.data.trend)).toBe(true);
      expect(parsed.data.trend.length).toBeGreaterThan(0);
      for (const point of parsed.data.trend) {
        expect(typeof point.timestamp).toBe('string');
        expect(typeof point.revenue).toBe('number');
        expect(typeof point.users).toBe('number');
        expect(typeof point.conversions).toBe('number');
      }
    }
  });
});
