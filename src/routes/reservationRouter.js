import { Router } from "express";
import ubpApiController from "../controllers/users_book_packs/ubpApiController.js"
import { isWorker, isClient } from "../controllers/middleware/authMiddleware.js";

const router = Router()

router.get('/api/reservations', isWorker, ubpApiController.getAllReservations);
router.get('/api/reservations/:id', isWorker, ubpApiController.showReservationById);
router.post('/api/reservations/create', isClient, ubpApiController.createReservationAPI);
router.put('/api/reservations/:id/cancel', isClient, ubpApiController.cancelReservationAPI);
router.put('/api/reservations/:id/status', isWorker, ubpApiController.updateReservationStatusAPI);




export default router