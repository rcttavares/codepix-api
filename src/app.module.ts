import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankAccount } from './bank-accounts/entities/bank-account.entity';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      database: 'nest',
      username: 'postgres',
      password: 'root',
      entities: [BankAccount],
      synchronize: true,
    }),
    BankAccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
