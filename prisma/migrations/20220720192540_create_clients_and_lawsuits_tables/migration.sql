-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "state" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "lawsuits" (
    "id" SERIAL NOT NULL,
    "initialism" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "charge" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_id_key" ON "clients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_cnpj_key" ON "clients"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "lawsuits_id_key" ON "lawsuits"("id");

-- CreateIndex
CREATE UNIQUE INDEX "lawsuits_initialism_key" ON "lawsuits"("initialism");

-- AddForeignKey
ALTER TABLE "lawsuits" ADD CONSTRAINT "lawsuits_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
