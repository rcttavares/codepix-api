import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { PixKeyNotFoundError } from '../../pix-keys/pix-keys.service';
import { Response } from 'express';

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
