import { BankAccount } from '../bank-accounts/entities/bank-account.entity';
import { FixturesCommand } from './fixtures.command';
import { Module } from '@nestjs/common';
import { PixKey } from '../pix-keys/entities/pix-key.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount, PixKey, Transaction])],
  providers: [FixturesCommand],
})
export class FixturesModule {}
