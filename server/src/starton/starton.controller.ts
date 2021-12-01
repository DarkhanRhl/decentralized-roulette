import { Controller, Get, Post, Body } from '@nestjs/common';
import { StartonService } from './starton.service';

@Controller()
export class StartonController {
  constructor(private readonly startonService: StartonService) {}

  @Get('wallet')
  getWallet(): number {
    return this.startonService.getWallet();
  }

  @Post('deposit')
  deposit(@Body() data: Record<string, number>): number {
    return this.startonService.deposit(data.amount);
  }

  @Post('credit')
  creditUser(@Body() data: Record<string, number>): string {
    return this.startonService.creditMjtn(data.amount);
  }

  @Post('getCredit')
  addCredit(@Body() data: Record<string, number>): string {
    return this.startonService.addCredit(data.amount);
  }

  @Get('spin')
  roll(): number {
    return this.startonService.roll();
  }

  @Post('signin')
  checkSignature(@Body() data: Record<string, string>): string {
    return this.startonService.checkSignature(data.signature);
  }
}
