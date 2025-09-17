import { IsString, IsOptional } from 'class-validator';

export class CreateDestinoDto {
  @IsString()
  nome: string;

  @IsString()
  viagemId: string;
}

export class UpdateDestinoDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  viagemId?: string;
}

export class DestinoResponseDto {
  id: string;
  nome: string;
  viagemId: string;
  createdAt: Date;
  updatedAt: Date;
  viagem?: {
    id: string;
    nome: string;
    dataSaida: Date;
    dataChegada: Date;
    valor: number;
  };
}