import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UrlShortenerModule } from './modules/url-shortener/url-shotener.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UrlShortenerModule  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
