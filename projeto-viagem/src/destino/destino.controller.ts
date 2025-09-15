import { Controller} from '@nestjs/common';
import { DestinoService } from './destino.service';

@Controller('destino')
export class DestinoController {
  constructor(private readonly destinoService: DestinoService) {}

}
