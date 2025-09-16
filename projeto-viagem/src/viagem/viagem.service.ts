import { Injectable } from '@nestjs/common';
import { Prisma, Viagem } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class ViagemService {
  constructor(private prisma: PrismaService){}

  async getViagens():Promise<Viagem[]>{
    return await this.prisma.viagem.findMany();
  }

  // async getViagems(params:{
  //   skip?:number;
  //   take?: number;
  //   cursor?: Prisma.ViagemWhereUniqueInput;
  //   where?: Prisma.ViagemWhereInput;
  //   orderBy?: Prisma.ViagemOrderByWithRelationInput;
  // }):Promise<Viagem[]>{
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.viagem.findMany({
  //     skip,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }
}
