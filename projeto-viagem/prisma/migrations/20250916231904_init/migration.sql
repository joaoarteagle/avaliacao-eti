-- CreateTable
CREATE TABLE "viagens" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data_saida" TIMESTAMP(3) NOT NULL,
    "data_chegada" TIMESTAMP(3) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "viagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "viagem_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "destinos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "destinos" ADD CONSTRAINT "destinos_viagem_id_fkey" FOREIGN KEY ("viagem_id") REFERENCES "viagens"("id") ON DELETE CASCADE ON UPDATE CASCADE;
