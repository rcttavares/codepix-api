import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { PixKeysService } from './pix-keys.service';
import { CreatePixKeyDto } from './dto/create-pix-key.dto';

@Controller('bank-accounts/:bankAccountId/pix-keys')
export class PixKeysController {
  constructor(private readonly pixKeysService: PixKeysService) {}

  @Post()
  create(
    @Param('bankAccountId') bankAccountId: string,
    @Body() createPixKeyDto: CreatePixKeyDto,
  ) {
    return this.pixKeysService.create(bankAccountId, createPixKeyDto);
  }

  @Get()
  findAll(@Param('bankAccountId') bankAccountId: string) {
    return this.pixKeysService.findAll(bankAccountId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('bankAccountId') bankAccountId: string,
    @Param('id') id: string,
  ) {
    return this.pixKeysService.remove(bankAccountId, id);
  }
}
