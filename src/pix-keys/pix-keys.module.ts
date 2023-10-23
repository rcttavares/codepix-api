import { BankAccount } from '../bank-accounts/entities/bank-account.entity';
import { Module } from '@nestjs/common';
import { PixKey } from './entities/pix-key.entity';
import { PixKeysController } from './pix-keys.controller';
import { PixKeysService } from './pix-keys.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PixKey, BankAccount])],
  controllers: [PixKeysController],
  providers: [PixKeysService],
})
export class PixKeysModule {}
