import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('leads')
  async getHello(@Query() params: {query: string}): Promise<object> {
    return await this.appService.getLeads(params.query);
  }
}
