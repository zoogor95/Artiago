import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('images/:imageName')
  getImages(@Param('imageName') imageName, @Res() res): string {
    return res.sendFile(imageName, { root: 'public' });
  }
}
