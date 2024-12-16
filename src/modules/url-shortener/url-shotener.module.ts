import { Module } from "@nestjs/common";
import { PrismaModule } from "src/database/prisma/prisma.module";
import { UrlShortenerService } from "./url-shortener.service";
import { UrlShortenerController } from "./url-shortener.controller";

@Module({
  imports: [PrismaModule],
  providers: [UrlShortenerService],
  controllers: [UrlShortenerController]
})

export class UrlShortenerModule { }