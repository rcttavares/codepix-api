import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { BankAccount } from '../bank-accounts/entities/bank-account.entity';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: {},
        },
        {
          provide: getRepositoryToken(BankAccount),
          useValue: {},
        },
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: 'KAFKA_SERVICE',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
