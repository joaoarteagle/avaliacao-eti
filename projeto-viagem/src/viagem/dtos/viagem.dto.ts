import { IsString, IsDateString, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/library';

export class CreateDestinoDto {
  @IsString()
  nome: string;
}

export class CreateViagemDto {
  @IsString()
  nome: string;

  @IsDateString()
  dataSaida: string;

  @IsDateString()
  dataChegada: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Transform(({ value }) => parseFloat(value))
  valor: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDestinoDto)
  @IsOptional()
  destinos?: CreateDestinoDto[];
}

export class UpdateViagemDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsDateString()
  @IsOptional()
  dataSaida?: string;

  @IsDateString()
  @IsOptional()
  dataChegada?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Transform(({ value }) => parseFloat(value))
  @IsOptional()
  valor?: number;
}

export class ViagemResponseDto {
  id: string;
  nome: string;
  dataSaida: Date;
  dataChegada: Date;
  valor: Decimal;
  createdAt: Date;
  updatedAt: Date;
  destinos?: DestinoResponseDto[];
}

export class DestinoResponseDto {
  id: string;
  nome: string;
  viagemId: string;
  createdAt: Date;
  updatedAt: Date;
}