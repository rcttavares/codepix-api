import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { PixKeyNotFoundError } from '../../pix-keys/pix-keys.service';

@Catch(PixKeyNotFoundError)
export class PixKeyNotFoundErrorFilter implements ExceptionFilter {
  catch(exception: PixKeyNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(404).json({
      statusCode: 404,
      message: exception.message,
    });
  }
}
