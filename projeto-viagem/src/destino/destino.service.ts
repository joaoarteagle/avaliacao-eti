import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDestinoDto, UpdateDestinoDto } from './dtos/destino.dto';

@Injectable()
export class DestinoService {
  constructor(private prisma: PrismaService){}

 async create(createDestinoDto: CreateDestinoDto) {
    const viagem = await this.prisma.viagem.findUnique({
      where: { id: createDestinoDto.viagemId }
    });

    if (!viagem) {
      throw new NotFoundException(`Viagem com ID ${createDestinoDto.viagemId} não encontrada`);
    }

    return this.prisma.destino.create({
      data: createDestinoDto,
      include: {
        viagem: {
          select: {
            id: true,
            nome: true,
            dataSaida: true,
            dataChegada: true,
            valor: true
          }
        }
      }
    });
  }




  async findAll() {
    return this.prisma.destino.findMany({
      include: {
        viagem: {
          select: {
            id: true,
            nome: true,
            dataSaida: true,
            dataChegada: true,
            valor: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }




  async findOne(id: string) {
    const destino = await this.prisma.destino.findUnique({
      where: { id },
      include: {
        viagem: {
          select: {
            id: true,
            nome: true,
            dataSaida: true,
            dataChegada: true,
            valor: true
          }
        }
      }
    });

    if (!destino) {
      throw new NotFoundException(`Destino com ID ${id} não encontrado`);
   
    }

    return destino;
  }

  async findByViagem(viagemId: string) {
    return this.prisma.destino.findMany({
      where: { viagemId },
      orderBy: {
        createdAt: 'asc'
      }
    });
  }

  async update(id: string, updateDestinoDto: UpdateDestinoDto) {
    await this.findOne(id);
    if (updateDestinoDto.viagemId) {
      const viagem = await this.prisma.viagem.findUnique({
        where: { id: updateDestinoDto.viagemId }
      });

      if (!viagem) {
        throw new NotFoundException(`Viagem com ID ${updateDestinoDto.viagemId} não encontrada`);
      }
    }

    return this.prisma.destino.update({
      where: { id },
      data: updateDestinoDto,
      include: {
        viagem: {
          select: {
            id: true,
            nome: true,
            dataSaida: true,
            dataChegada: true,
            valor: true
          }
        }
      }
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    
    return this.prisma.destino.delete({
      where: { id }
    });
  }


 
}
