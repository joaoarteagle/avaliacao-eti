import { Injectable } from '@nestjs/common';
import { Prisma, Viagem } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class ViagemService {
  constructor(private prisma: PrismaService){}

  async getViagem(
    viagem: Prisma.ViagemWhereUniqueInput,
  ):Promise<Viagem | null>{
    return this.prisma.viagem.findUnique({
      where: viagem,
    });
  }
}
