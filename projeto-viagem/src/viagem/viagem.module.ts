import { Module } from '@nestjs/common';
import { ViagemService } from './viagem.service';
import { ViagemController } from './viagem.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ViagemController],
  providers: [ViagemService, PrismaService],
  exports:[ViagemService],
})
export class ViagemModule {}
