import { Test, TestingModule } from '@nestjs/testing';
import { DietChartService } from './diet-chart.service';

describe('DietChartService', () => {
  let service: DietChartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DietChartService],
    }).compile();

    service = module.get<DietChartService>(DietChartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
