import { Router } from "express";
import ubpApiController from "../controllers/users_book_packs/ubpApiController.js"

const router = Router()

router.get('/api/reservations', ubpApiController.getAllReservations);
router.get('/api/reservations/:id', ubpApiController.showReservationById);

export default router