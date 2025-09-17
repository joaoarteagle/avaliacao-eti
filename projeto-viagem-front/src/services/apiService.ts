import axios from "axios";
import { Viagem, Destino, CreateViagemDto, UpdateViagemDto, CreateDestinoDto, UpdateDestinoDto } from '../types/types';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const viagemApi = {
  // Listar todas as viagens
  getAll: async (): Promise<Viagem[]> => {
    const response = await api.get('/viagem');
    return response.data;
  },

  // Buscar viagem por ID
  getById: async (id: string): Promise<Viagem> => {
    const response = await api.get(`/viagem/${id}`);
    return response.data;
  },

  // Criar nova viagem
  create: async (data: CreateViagemDto): Promise<Viagem> => {
    const response = await api.post('/viagem', data);
    return response.data;
  },

  // Atualizar viagem
  update: async (id: string, data: UpdateViagemDto): Promise<Viagem> => {
    const response = await api.patch(`/viagem/${id}`, data);
    return response.data;
  },

  // Excluir viagem
  delete: async (id: string): Promise<void> => {
    await api.delete(`/viagem/${id}`);
  },

  // Adicionar destino à viagem
  addDestino: async (viagemId: string, nome: string): Promise<Destino> => {
    const response = await api.post(`/viagem/${viagemId}/destino`, { nome });
    return response.data;
  },

  // Remover destino da viagem
  removeDestino: async (viagemId: string, destinoId: string): Promise<void> => {
    await api.delete(`/viagem/${viagemId}/destino/${destinoId}`);
  },
};

export const destinoApi = {
  // Listar todos os destinos
  getAll: async (): Promise<Destino[]> => {
    const response = await api.get('/destino');
    return response.data;
  },

  // Buscar destino por ID
  getById: async (id: string): Promise<Destino> => {
    const response = await api.get(`/destino/${id}`);
    return response.data;
  },

  // Listar destinos de uma viagem
  getByViagem: async (viagemId: string): Promise<Destino[]> => {
    const response = await api.get(`/destino/viagem/${viagemId}`);
    return response.data;
  },

  // Criar novo destino
  create: async (data: CreateDestinoDto): Promise<Destino> => {
    const response = await api.post('/destino', data);
    return response.data;
  },

  // Atualizar destino
  update: async (id: string, data: UpdateDestinoDto): Promise<Destino> => {
    const response = await api.patch(`/destino/${id}`, data);
    return response.data;
  },

  // Excluir destino
  delete: async (id: string): Promise<void> => {
    await api.delete(`/destino/${id}`);
  },
};

export default api;
