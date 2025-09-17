import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ViagemService } from './viagem.service';
import { CreateViagemDto, UpdateViagemDto } from './dtos/viagem.dto';


@Controller('viagem')
@UsePipes(new ValidationPipe({ transform: true}))
export class ViagemController {
  constructor(private readonly viagemService: ViagemService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createViagemDto: CreateViagemDto) {
    return this.viagemService.create(createViagemDto);
  }

  @Get()
  findAll() {
    return this.viagemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viagemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViagemDto: UpdateViagemDto) {
    return this.viagemService.update(id, updateViagemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.viagemService.remove(id);
  }






  @Post(':id/destinos')
  @HttpCode(HttpStatus.CREATED)
  addDestino(
    @Param('id') viagemId: string,
    @Body('nome') nomeDestino: string,
  ) {
    return this.viagemService.addDestino(viagemId, nomeDestino);
  }

  @Delete(':viagemId/destinos/:destinoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeDestino(
    @Param('viagemId') viagemId: string,
    @Param('destinoId') destinoId: string,
  ) {
    await this.viagemService.removeDestino(viagemId, destinoId);
  }

}
