import { Test, TestingModule } from '@nestjs/testing';
import { StartonController } from './starton.controller';

describe('StartonController', () => {
  let controller: StartonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StartonController],
    }).compile();

    controller = module.get<StartonController>(StartonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
