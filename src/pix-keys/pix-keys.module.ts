import { ClientsModule, Transport } from '@nestjs/microservices';

import { BankAccount } from '../bank-accounts/entities/bank-account.entity';
import { Module } from '@nestjs/common';
import { PixKey } from './entities/pix-key.entity';
import { PixKeysController } from './pix-keys.controller';
import { PixKeysService } from './pix-keys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([PixKey, BankAccount]),
    ClientsModule.register([
      {
        name: 'PIX_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'host.docker.internal:50051',
          package: 'github.com.rcttavares.codepix',
          protoPath: [join(__dirname, 'proto', 'pix.proto')],
        },
      },
    ]),
  ],
  controllers: [PixKeysController],
  providers: [PixKeysService],
})
export class PixKeysModule {}
