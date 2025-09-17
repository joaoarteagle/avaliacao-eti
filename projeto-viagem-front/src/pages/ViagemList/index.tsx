
import { Button } from "@/components/atoms/button";
import { ViagemCard } from "@/components/molecules/viagemCard";
import { viagemApi } from "@/services/apiService";
import { Viagem } from "@/types/types";
import { useEffect, useState } from "react";
export function ViagemList(){
    const [viagens, setviagens] = useState<Viagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingViagem, setEditingViagem] = useState<Viagem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
    
  
  
  const loadViagens = async () => {
    try {
      setError(null);
      const data = await viagemApi.getAll();
      setviagens(data);
    } catch (error) {
      console.error('Erro ao carregar Viagem:', error);
      setError('Erro ao carregar a lista de Viagem');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadViagens();
  }, []);


  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta Viagem?')) return;

    try {
      setDeletingId(id);
      await viagemApi.delete(id);
      setviagens(prev => prev.filter(p => p.id !== id));
      alert('Viagem excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir Viagem:', error);
      alert('Erro ao excluir Viagem');
    } finally {
      setDeletingId(null);
    }
  };

  

   const handleEdit = (viagem: Viagem) => {
    setEditingViagem(viagem);
    setShowForm(false);
  };

    return(
        <div className="viagem-grid">
        {viagens.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum viagem encontrado</p>
            <Button onClick={() => setShowForm(true)}>
              Criar Primeiro viagem
            </Button>
          </div>
        ) : (
          viagens.map((viagem) => (
            <ViagemCard
              key={viagem.id}
              viagem={viagem}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={deletingId === viagem.id}
            />
          ))
        )}
      </div>
    )
}