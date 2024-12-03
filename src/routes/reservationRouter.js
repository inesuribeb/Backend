import { Router } from "express";
import ubpApiController from "../controllers/users_book_packs/ubpApiController.js"

const router = Router()

router.get('/api/reservations', ubpApiController.getAllReservations);
router.get('/api/reservations/:id', ubpApiController.showReservationById);
router.post('/api/reservations/create', ubpApiController.createReservationAPI);
router.put('/api/reservations/:id/cancel', ubpApiController.cancelReservationAPI);



export default router