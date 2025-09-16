import { Controller, Get } from '@nestjs/common';
import { ViagemService } from './viagem.service';


@Controller('viagem')
export class ViagemController {
  constructor(private readonly viagemService: ViagemService) {}

  @Get('/')
  async getViagems(){
    return this.viagemService.getViagens();
  }

}
