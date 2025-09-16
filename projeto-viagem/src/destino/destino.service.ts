import { Injectable } from '@nestjs/common';
import { Destino, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DestinoService {
  constructor(private prisma: PrismaService){}

  async getDestinos():Promise<Destino[]>{
    return await this.prisma.destino.findMany();
  }


  // async posts(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.DestinoWhereUniqueInput;
  //   where?: Prisma.DestinoWhereInput;
  //   orderBy?: Prisma.DestinoOrderByWithRelationInput;
  // }): Promise<Destino[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.destino.findMany({
  //     skip,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }
}
