export interface Destino {
  id: string;
  nome: string;
  viagemId: string;
  createdAt: string;
  updatedAt: string;
  viagem?: {
    id: string;
    nome: string;
    dataSaida: string;
    dataChegada: string;
    valor: number;
  };
}

export interface Viagem {
  id: string;
  nome: string;
  dataSaida: string;
  dataChegada: string;
  valor: number;
  createdAt: string;
  updatedAt: string;
  destinos?: Destino[];
}

export interface CreateViagemDto {
  nome: string;
  dataSaida: string;
  dataChegada: string;
  valor: number;
  destinos?: { nome: string }[];
}

export interface UpdateViagemDto {
  nome?: string;
  dataSaida?: string;
  dataChegada?: string;
  valor?: number;
}

export interface CreateDestinoDto {
  nome: string;
  viagemId: string;
}

export interface UpdateDestinoDto {
  nome?: string;
  viagemId?: string;
}