import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccount } from './entities/bank-account.entity';

describe('BankAccountsService', () => {
  let service: BankAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankAccountsService,
        {
          provide: getRepositoryToken(BankAccount),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BankAccountsService>(BankAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
