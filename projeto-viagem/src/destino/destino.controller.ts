import { Controller, Get} from '@nestjs/common';
import { DestinoService } from './destino.service';

@Controller('destino')
export class DestinoController {
  constructor(private readonly destinoService: DestinoService) {}

    @Get('/')
    async getDestinos(){
      return this.destinoService.getDestinos();
    }
}
