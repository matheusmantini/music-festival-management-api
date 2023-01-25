-- CreateTable
CREATE TABLE "lama_bands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "music_genre" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,

    CONSTRAINT "lama_bands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lama_shows" (
    "id" TEXT NOT NULL,
    "week_day" TEXT NOT NULL,
    "start_time" INTEGER NOT NULL,
    "end_time" INTEGER NOT NULL,
    "band_id" TEXT NOT NULL,

    CONSTRAINT "lama_shows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lama_users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'NORMAL',

    CONSTRAINT "lama_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lama_tickets" (
    "id" TEXT NOT NULL,
    "ticket_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "total_quantity" INTEGER NOT NULL,
    "sold_quantity" INTEGER NOT NULL DEFAULT 0,
    "show_id" TEXT NOT NULL,

    CONSTRAINT "lama_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lama_sold_tickets" (
    "id" TEXT NOT NULL,
    "ticket_quantity" INTEGER NOT NULL,
    "name_ticket" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "lama_sold_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lama_photos" (
    "id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "show_id" TEXT NOT NULL,

    CONSTRAINT "lama_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lama_bands_name_key" ON "lama_bands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "lama_bands_responsible_key" ON "lama_bands"("responsible");

-- CreateIndex
CREATE UNIQUE INDEX "lama_shows_week_day_key" ON "lama_shows"("week_day");

-- CreateIndex
CREATE UNIQUE INDEX "lama_tickets_ticket_name_key" ON "lama_tickets"("ticket_name");

-- CreateIndex
CREATE UNIQUE INDEX "lama_photos_photo_key" ON "lama_photos"("photo");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_userId_key" ON "refresh_token"("userId");

-- AddForeignKey
ALTER TABLE "lama_shows" ADD CONSTRAINT "lama_shows_band_id_fkey" FOREIGN KEY ("band_id") REFERENCES "lama_bands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lama_tickets" ADD CONSTRAINT "lama_tickets_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "lama_shows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lama_sold_tickets" ADD CONSTRAINT "lama_sold_tickets_name_ticket_fkey" FOREIGN KEY ("name_ticket") REFERENCES "lama_tickets"("ticket_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lama_sold_tickets" ADD CONSTRAINT "lama_sold_tickets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "lama_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lama_photos" ADD CONSTRAINT "lama_photos_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "lama_shows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lama_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
