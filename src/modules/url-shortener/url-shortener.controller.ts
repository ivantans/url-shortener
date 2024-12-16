import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { UrlShortenerService } from "./url-shortener.service";
import { UrlShortenerDto } from "./dto/url-shortener.dto";
import { Response } from "express";

@Controller()
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) { }

  @Post()
  async shortener(@Body() urlShortenerDto: UrlShortenerDto) {
    try {
      return this.urlShortenerService.urlShortener(urlShortenerDto)
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  @Get("/:url")
  async redirect(@Param("url") url: string, @Res() response: Response) {
    try {
      console.log(url);
      const result = await this.urlShortenerService.redirect(url);
      return response.redirect(result)
    } catch (e) {
      throw e
    }
  }
}