import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import { DestinoService } from './destino.service';
import { CreateDestinoDto, UpdateDestinoDto } from './dtos/destino.dto';

@Controller('destino')
export class DestinoController {
  constructor(private readonly destinoService: DestinoService) {}

@Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDestinoDto: CreateDestinoDto) {
    return this.destinoService.create(createDestinoDto);
  }

  @Get()
  findAll() {
    return this.destinoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.destinoService.findOne(id);
  }

  @Get('viagem/:viagemId')
  findByViagem(@Param('viagemId') viagemId: string) {
    return this.destinoService.findByViagem(viagemId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDestinoDto: UpdateDestinoDto) {
    return this.destinoService.update(id, updateDestinoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.destinoService.remove(id);
  }
}
