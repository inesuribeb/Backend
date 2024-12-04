import { Router } from "express";
import packApiController from "../controllers/pack/packApiController.js"
import { isAdmin } from "../controllers/middleware/authMiddleware.js";

const router = Router()

router.get('/api/packs', packApiController.getAllPacks);
router.get('/api/packs/:id', packApiController.getPackById);
router.post('/api/packs/create', isAdmin, packApiController.createPackAPI);
router.put('/api/packs/:id/deactivate', isAdmin, packApiController.deactivatePackAPI);


export default router