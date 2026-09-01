import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import {
  PixKeysService,
  PixKeyGrpcUnknownError,
  PixKeyNotFoundError,
} from './pix-keys.service';
import { PixKey } from './entities/pix-key.entity';
import { BankAccount } from '../bank-accounts/entities/bank-account.entity';

describe('PixKeysService', () => {
  let service: PixKeysService;
  let pixKeyRepo: { findOne: jest.Mock; delete: jest.Mock };
  let pixGrpcService: { deactivatePixKey: jest.Mock };

  beforeEach(async () => {
    pixKeyRepo = {
      findOne: jest.fn(),
      delete: jest.fn(),
    };
    pixGrpcService = {
      deactivatePixKey: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PixKeysService,
        {
          provide: getRepositoryToken(PixKey),
          useValue: pixKeyRepo,
        },
        {
          provide: getRepositoryToken(BankAccount),
          useValue: {},
        },
        {
          provide: 'PIX_PACKAGE',
          useValue: {
            getService: () => pixGrpcService,
          },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<PixKeysService>(PixKeysService);
    service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('remove', () => {
    const bankAccountId = 'bank-account-id';
    const id = 'pix-key-id';

    it('deactivates the key remotely and deletes the local record', async () => {
      pixKeyRepo.findOne.mockResolvedValue({
        id,
        bank_account_id: bankAccountId,
      });
      pixGrpcService.deactivatePixKey.mockReturnValue(
        of({ id, status: 'deactivated', error: '' }),
      );

      await service.remove(bankAccountId, id);

      expect(pixKeyRepo.findOne).toHaveBeenCalledWith({
        where: { id, bank_account_id: bankAccountId },
      });
      expect(pixGrpcService.deactivatePixKey).toHaveBeenCalledWith(
        { id },
        expect.anything(),
      );
      expect(pixKeyRepo.delete).toHaveBeenCalledWith({ id });
    });

    it('throws PixKeyNotFoundError when the key does not belong to the bank account', async () => {
      pixKeyRepo.findOne.mockResolvedValue(null);

      await expect(service.remove(bankAccountId, id)).rejects.toThrow(
        PixKeyNotFoundError,
      );
      expect(pixGrpcService.deactivatePixKey).not.toHaveBeenCalled();
    });

    it('throws PixKeyGrpcUnknownError when the remote deactivation fails', async () => {
      pixKeyRepo.findOne.mockResolvedValue({
        id,
        bank_account_id: bankAccountId,
      });
      pixGrpcService.deactivatePixKey.mockReturnValue(
        of({ id: '', status: 'not deactivated', error: 'no key was found' }),
      );

      await expect(service.remove(bankAccountId, id)).rejects.toThrow(
        PixKeyGrpcUnknownError,
      );
      expect(pixKeyRepo.delete).not.toHaveBeenCalled();
    });
  });
});
