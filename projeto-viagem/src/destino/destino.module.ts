import { Module } from '@nestjs/common';
import { DestinoService } from './destino.service';
import { DestinoController } from './destino.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DestinoController],
  providers: [DestinoService, PrismaService],
  exports:[DestinoService],
})
export class DestinoModule {}
