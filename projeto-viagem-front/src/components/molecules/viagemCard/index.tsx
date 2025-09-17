import { Button } from "@/components/atoms/button";
import { Destino, Viagem } from "@/types/types";
import "./styles.css";
import { destinoApi } from "@/services/apiService";
import { useState } from "react";

interface ViagemCardProps {
  viagem: Viagem;
  onEdit: (viagem: Viagem) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function ViagemCard({
  viagem,
  onEdit,
  onDelete,
  isDeleting = false,
}: ViagemCardProps) {
    const [destino, setDestino] = useState<Destino[]>([]);
      const [deletingId, setDeletingId] = useState<string | null>(null);

      const handleDeleteDestino = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este destino?")) return;

    try {
      setDeletingId(id);
      await destinoApi.delete(id);
      setDestino((prev) => prev.filter((p) => p.id !== id));
      alert("Destino excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir Destino:", error);
      alert("Erro ao excluir Destino");
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div className="viagem-card">
      <div className="viagem-header">
        <h3 className="viagem-name">{viagem.nome}</h3>
        <span className="viagem-preco">R$ {viagem.valor},00</span>
      </div>

      <div className="viagem-info">
        <p className="viagem-type">
          <strong>Data Saida:</strong> {viagem.dataSaida}
        </p>
        <p className="viagem-type">
          <strong>Data Chegada</strong> {viagem.dataChegada}
        </p>
      </div>
      <ul>
        <h2>DESTINOS:</h2>
        {viagem.destinos?.map((destino) => (
          <li key={destino.id}>
            {destino.nome}
            <Button
              variant="danger"
              onClick={() => handleDeleteDestino(destino.id)}
              loading={isDeleting}
              disabled={isDeleting}
            >
              Excluir
            </Button>{" "}
          </li>
        ))}
      </ul>
      <div className="viagem-actions">
        <Button variant="secondary" onClick={() => onEdit(viagem)}>
          Editar
        </Button>
        <Button
          variant="danger"
          onClick={() => onDelete(viagem.id)}
          loading={isDeleting}
          disabled={isDeleting}
        >
          Excluir
        </Button>
      </div>
    </div>
  );
}
