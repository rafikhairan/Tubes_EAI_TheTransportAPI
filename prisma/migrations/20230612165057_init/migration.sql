-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nama" TEXT,
    "alamat" TEXT,
    "noTelp" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "noTelp" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kendaraan" (
    "noPol" TEXT NOT NULL,
    "idDriver" INTEGER NOT NULL,
    "armada" TEXT NOT NULL,
    "kursiTersedia" INTEGER NOT NULL,

    CONSTRAINT "Kendaraan_pkey" PRIMARY KEY ("noPol")
);

-- CreateTable
CREATE TABLE "Kota" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Kota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rute" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "noPol" TEXT NOT NULL,
    "berangkat" TEXT NOT NULL,
    "kedatangan" TEXT NOT NULL,
    "idKotaAsal" INTEGER NOT NULL,
    "idKotaTujuan" INTEGER NOT NULL,

    CONSTRAINT "Rute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id" SERIAL NOT NULL,
    "tanggalTransaksi" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tiket" (
    "id" SERIAL NOT NULL,
    "tanggalPesan" TEXT NOT NULL,
    "idTransaksi" INTEGER NOT NULL,
    "idRute" INTEGER NOT NULL,

    CONSTRAINT "Tiket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Kendaraan_idDriver_key" ON "Kendaraan"("idDriver");

-- CreateIndex
CREATE UNIQUE INDEX "Rute_noPol_key" ON "Rute"("noPol");

-- AddForeignKey
ALTER TABLE "Kendaraan" ADD CONSTRAINT "Kendaraan_idDriver_fkey" FOREIGN KEY ("idDriver") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rute" ADD CONSTRAINT "Rute_idKotaAsal_fkey" FOREIGN KEY ("idKotaAsal") REFERENCES "Kota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rute" ADD CONSTRAINT "Rute_idKotaTujuan_fkey" FOREIGN KEY ("idKotaTujuan") REFERENCES "Kota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rute" ADD CONSTRAINT "Rute_noPol_fkey" FOREIGN KEY ("noPol") REFERENCES "Kendaraan"("noPol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_idRute_fkey" FOREIGN KEY ("idRute") REFERENCES "Rute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_idTransaksi_fkey" FOREIGN KEY ("idTransaksi") REFERENCES "Transaksi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
