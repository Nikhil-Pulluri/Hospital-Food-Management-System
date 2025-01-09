import { Test, TestingModule } from '@nestjs/testing';
import { DietChartController } from './diet-chart.controller';

describe('DietChartController', () => {
  let controller: DietChartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DietChartController],
    }).compile();

    controller = module.get<DietChartController>(DietChartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
