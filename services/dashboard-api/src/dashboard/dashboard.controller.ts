import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiProperty,
  ApiExtraModels,
} from '@nestjs/swagger';
import { DashboardResponseSchema, type DashboardResponse } from '@smtf/schemas';

export class TrendPointDto {
  @ApiProperty({
    description: 'ISO 8601 timestamp of the data point',
    example: '2025-01-02T12:00:00.000Z',
  })
  timestamp!: string;

  @ApiProperty({ description: 'Revenue value for the period', example: 2100 })
  revenue!: number;

  @ApiProperty({ description: 'Active users in the period', example: 160 })
  users!: number;

  @ApiProperty({ description: 'Conversions in the period', example: 5 })
  conversions!: number;
}

export class DashboardResponseDto {
  @ApiProperty({ description: 'Total revenue for today', example: 12345.67 })
  revenueToday!: number;

  @ApiProperty({ description: 'Number of active users', example: 842 })
  activeUsers!: number;

  @ApiProperty({
    description: 'Current conversion rate (0-1)',
    example: 0.0345,
  })
  conversionRate!: number;

  @ApiProperty({
    type: () => [TrendPointDto],
    description: 'Recent trend points',
  })
  trend!: TrendPointDto[];
}

export class InternalValidationErrorDto {
  @ApiProperty({ example: 'Internal data validation failed' })
  message!: string;

  @ApiProperty({
    type: () => [Object],
    description: 'Validation issues emitted by the internal schema validator',
  })
  issues!: any[];
}

@ApiTags('dashboard')
@ApiExtraModels(TrendPointDto)
@Controller('dashboard')
export class DashboardController {
  @ApiOperation({
    summary: 'Get dashboard data',
    description:
      'Returns aggregated metrics for the dashboard, including revenue, active users, conversion rate, and a recent time-series trend.',
  })
  @ApiOkResponse({
    description: 'Dashboard data returned successfully',
    type: DashboardResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal data validation failed',
    type: InternalValidationErrorDto,
  })
  @Get()
  getDashboard(): DashboardResponse {
    const mockData = {
      revenueToday: 12345.67,
      activeUsers: 842,
      conversionRate: 0.0345,
      trend: [
        {
          timestamp: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
          revenue: 2100,
          users: 160,
          conversions: 5,
        },
        {
          timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
          revenue: 2500,
          users: 180,
          conversions: 6,
        },
        {
          timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
          revenue: 3100,
          users: 210,
          conversions: 7,
        },
        {
          timestamp: new Date().toISOString(),
          revenue: 3645.67,
          users: 220,
          conversions: 8,
        },
      ],
    };

    const parsed = DashboardResponseSchema.safeParse(mockData);

    if (!parsed.success) {
      throw new HttpException(
        {
          message: 'Internal data validation failed',
          issues: parsed.error.issues,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return parsed.data;
  }
}
