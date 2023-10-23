import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankAccount } from './bank-accounts/entities/bank-account.entity';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { Module } from '@nestjs/common';
import { PixKey } from './pix-keys/entities/pix-key.entity';
import { PixKeysModule } from './pix-keys/pix-keys.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      database: 'nest',
      username: 'postgres',
      password: 'root',
      entities: [BankAccount, PixKey],
      synchronize: true,
    }),
    BankAccountsModule,
    PixKeysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
