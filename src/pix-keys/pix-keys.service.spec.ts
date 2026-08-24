import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { PixKeysService } from './pix-keys.service';
import { PixKey } from './entities/pix-key.entity';
import { BankAccount } from '../bank-accounts/entities/bank-account.entity';

describe('PixKeysService', () => {
  let service: PixKeysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PixKeysService,
        {
          provide: getRepositoryToken(PixKey),
          useValue: {},
        },
        {
          provide: getRepositoryToken(BankAccount),
          useValue: {},
        },
        {
          provide: 'PIX_PACKAGE',
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PixKeysService>(PixKeysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
