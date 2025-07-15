-- DropIndex
DROP INDEX `Chambre_hebergementId_fkey` ON `chambre`;

-- DropIndex
DROP INDEX `Chambre_typeChambreId_fkey` ON `chambre`;

-- DropIndex
DROP INDEX `Paiement_utilisateurId_fkey` ON `paiement`;

-- DropIndex
DROP INDEX `Photo_hebergementId_fkey` ON `photo`;

-- DropIndex
DROP INDEX `Reservation_chambreId_fkey` ON `reservation`;

-- DropIndex
DROP INDEX `Reservation_utilisateurId_fkey` ON `reservation`;

-- DropIndex
DROP INDEX `TypeChambreHebergement_hebergementId_fkey` ON `typechambrehebergement`;

-- DropIndex
DROP INDEX `TypeChambreHebergement_typeChambreId_fkey` ON `typechambrehebergement`;

-- DropIndex
DROP INDEX `VideoPrivee_hebergementId_fkey` ON `videoprivee`;

-- AlterTable
ALTER TABLE `videoprivee` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `TypeChambreHebergement` ADD CONSTRAINT `TypeChambreHebergement_hebergementId_fkey` FOREIGN KEY (`hebergementId`) REFERENCES `Hebergement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TypeChambreHebergement` ADD CONSTRAINT `TypeChambreHebergement_typeChambreId_fkey` FOREIGN KEY (`typeChambreId`) REFERENCES `TypeChambre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chambre` ADD CONSTRAINT `Chambre_hebergementId_fkey` FOREIGN KEY (`hebergementId`) REFERENCES `Hebergement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chambre` ADD CONSTRAINT `Chambre_typeChambreId_fkey` FOREIGN KEY (`typeChambreId`) REFERENCES `TypeChambre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_chambreId_fkey` FOREIGN KEY (`chambreId`) REFERENCES `Chambre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paiement` ADD CONSTRAINT `Paiement_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paiement` ADD CONSTRAINT `Paiement_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VideoPrivee` ADD CONSTRAINT `VideoPrivee_hebergementId_fkey` FOREIGN KEY (`hebergementId`) REFERENCES `Hebergement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_hebergementId_fkey` FOREIGN KEY (`hebergementId`) REFERENCES `Hebergement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
