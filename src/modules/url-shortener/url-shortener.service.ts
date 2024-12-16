import { Injectable, NotFoundException } from "@nestjs/common";
import { UrlShortenerDto } from "./dto/url-shortener.dto";
import { PrismaService } from "src/database/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { randomBytes } from "crypto"; // Menggunakan crypto untuk random string
import slugify from "slugify"; // Pastikan slugify sudah di-install

@Injectable()
export class UrlShortenerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) { }



  // Fungsi untuk melakukan URL shortener
  async urlShortener(urlShortenerDto: UrlShortenerDto) {
    try {
      const PORT = this.configService.get<number>("PORT", 3000); // Fallback jika tidak ada PORT
      const HOST = this.configService.get<string>("HOST", "http://localhost"); // Fallback jika tidak ada HOST

      let shortenedUrl: string;

      // Jika title ada, buat shortenedUrl berdasarkan title
      if (urlShortenerDto.title) {
        const count = await this.prisma.url.count({
          where: {
            title: {
              startsWith: urlShortenerDto.title,  // Harus diawali dengan 'product'
              contains: urlShortenerDto.title,    // Harus mengandung 'product' di tengah
              endsWith: urlShortenerDto.title,
            }
          }
        })

        if (count > 0) {
          const createUrl = await this.prisma.url.create({
            data: {
              originalUrl: urlShortenerDto.originalUrl,
              title: urlShortenerDto.title,
              shortenedUrl: `${urlShortenerDto.title}-${count + 1}`
            }
          });

          return {
            shortenedUrl: `${HOST}:${PORT}/${createUrl.shortenedUrl}`,
          }
        }

        else {
          const createUrl = await this.prisma.url.create({
            data: {
              originalUrl: urlShortenerDto.originalUrl,
              title: urlShortenerDto.title,
              shortenedUrl: urlShortenerDto.title
            }
          });
          return {
            shortenedUrl: `${HOST}:${PORT}/${createUrl.shortenedUrl}`,
          }
        }
      }



      // Jika title tidak ada, buat shortenedUrl menggunakan random string
      const randomString = randomBytes(4).toString("hex"); // 4 bytes = 8 hex chars
      const url = await this.prisma.url.create({
        data: {
          originalUrl: urlShortenerDto.originalUrl,
          shortenedUrl: randomString, // Gunakan random string sebagai slug
          title: null, // Tidak ada title, simpan sebagai null
        },
      });

      return {
        shortenedUrl: `${HOST}:${PORT}/${url.shortenedUrl}`,
      };
    } catch (e) {
      console.error("Error in urlShortenerService:", e);
      throw new Error("Error creating shortened URL.");
    }
  }

  // Fungsi untuk melakukan redirect
  async redirect(url: string) {
    try {
      const urlRecord = await this.prisma.url.findUnique({
        where: {
          shortenedUrl: url, // Mencari berdasarkan shortened URL
        },
      });

      if (!urlRecord) {
        throw new NotFoundException("URL Not Found.");
      }

      return urlRecord.originalUrl;
    } catch (e) {
      console.error("Error in redirect:", e);
      throw e; // Lemparkan kembali error yang terjadi
    }
  }
}
