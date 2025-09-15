-- CreateTable
CREATE TABLE "public"."Viagem" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataSaida" TIMESTAMP(3) NOT NULL,
    "dataChegada" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Viagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Destino" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idViagem" INTEGER,

    CONSTRAINT "Destino_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Destino" ADD CONSTRAINT "Destino_idViagem_fkey" FOREIGN KEY ("idViagem") REFERENCES "public"."Viagem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
