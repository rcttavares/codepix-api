import { ClientsModule, Transport } from '@nestjs/microservices';

import { BankAccount } from '../bank-accounts/entities/bank-account.entity';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PixKey } from './entities/pix-key.entity';
import { PixKeysController } from './pix-keys.controller';
import { PixKeysService } from './pix-keys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([PixKey, BankAccount]),
    ClientsModule.registerAsync([
      {
        name: 'PIX_PACKAGE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get('GRPC_URL'),
            package: 'github.com.rcttavares.codepix',
            protoPath: [join(__dirname, 'proto/pix.proto')],
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [PixKeysController],
  providers: [PixKeysService],
})
export class PixKeysModule {}
