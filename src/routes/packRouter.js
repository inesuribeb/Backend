import { Router } from "express";
import packApiController from "../controllers/pack/packApiController.js"

const router = Router()

router.get('/api/packs', packApiController.getAllPacks);
router.get('/api/packs/:id', packApiController.getPackById);
router.post('/api/packs/create', packApiController.createPackAPI);
router.put('/api/packs/:id/deactivate', packApiController.deactivatePackAPI);


export default router