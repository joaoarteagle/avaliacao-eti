import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViagemModule } from './viagem/viagem.module';
import { DestinoModule } from './destino/destino.module';
import { PrismaService } from './prisma.service';


@Module({
  imports: [ViagemModule, DestinoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports:[PrismaService],
})
export class AppModule {}
