import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const responseBody = exception.getResponse();
      return response.status(status).json({
        statusCode: status,
        statusMessage: HttpStatus[status],
        timestamp: new Date().toISOString(),
        path: request.url,
        message: responseBody["message"]
      })
    }


    return response.status(500).json({
      statusCode: 500,
      statusMessage: HttpStatus[500],
      timestamp: new Date().toISOString(),
      path: request.url,
      message: "An unexpected error occurred",
    })

  }
}
