import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator"

export class UrlShortenerDto {
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  originalUrl: string

  @IsOptional()
  @IsString()
  title: string
}