import { Router } from "express";
import packApiController from "../controllers/pack/packApiController.js"

const router = Router()

router.get('/api/packs', packApiController.getAllPacks);
router.get('/api/packs/:id', packApiController.getPackById);

export default router