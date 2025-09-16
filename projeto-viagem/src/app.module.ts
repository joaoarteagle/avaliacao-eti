import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViagemModule } from './viagem/viagem.module';
import { DestinoModule } from './destino/destino.module';
import { ViagemService } from './viagem/viagem.service';

@Module({
  imports: [ViagemModule, DestinoModule],
  controllers: [AppController],
  providers: [AppService, ViagemService],
})
export class AppModule {}
