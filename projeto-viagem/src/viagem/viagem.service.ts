import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Viagem } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma.service';
import { CreateViagemDto, UpdateViagemDto } from './dtos/viagem.dto';


@Injectable()
export class ViagemService {
  constructor(private prisma: PrismaService){}

  async getViagens():Promise<Viagem[]>{
    return await this.prisma.viagem.findMany();
  }

 async create(createViagemDto: CreateViagemDto) {
    const { destinos, ...viagemData } = createViagemDto;
    
    return this.prisma.viagem.create({
      data: {
        ...viagemData,
        dataSaida: new Date(createViagemDto.dataSaida),
        dataChegada: new Date(createViagemDto.dataChegada),
        valor: new Decimal(createViagemDto.valor),
        destinos: destinos ? {
          create: destinos
        } : undefined
      },
      include: {
        destinos: true
      }
    });
  }

  async findAll() {
    return this.prisma.viagem.findMany({
      include: {
        destinos: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findOne(id: string) {
    const viagem = await this.prisma.viagem.findUnique({
      where: { id },
      include: {
        destinos: true
      }
    });

    if (!viagem) {
      throw new NotFoundException(`Viagem com ID ${id} não encontrada`);
    }

    return viagem;
  }

  async update(id: string, updateViagemDto: UpdateViagemDto) {
    await this.findOne(id);

    const updateData: any = { ...updateViagemDto };
    
    if (updateViagemDto.dataSaida) {
      updateData.dataSaida = new Date(updateViagemDto.dataSaida);
    }
    
    if (updateViagemDto.dataChegada) {
      updateData.dataChegada = new Date(updateViagemDto.dataChegada);
    }
    
    if (updateViagemDto.valor !== undefined) {
      updateData.valor = new Decimal(updateViagemDto.valor);
    }

    return this.prisma.viagem.update({
      where: { id },
      data: updateData,
      include: {
        destinos: true
      }
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.viagem.delete({
      where: { id },
      include: {
        destinos: true
      }
    });
  }


  async addDestino(viagemId: string, nomeDestino: string) {
    await this.findOne(viagemId); 

    return this.prisma.destino.create({
      data: {
        nome: nomeDestino,
        viagemId
      },
      include: {
        viagem: true
      }
    });
  }

  async removeDestino(viagemId: string, destinoId: string) {
    const destino = await this.prisma.destino.findFirst({
      where: {
        id: destinoId,
        viagemId
      }
    });

    if (!destino) {
      throw new NotFoundException(`Destino com ID ${destinoId} não encontrado nesta viagem`);
    }

    return this.prisma.destino.delete({
      where: { id: destinoId }
    });
  }
}
