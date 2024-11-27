import { Router } from "express";
import workerApiController from "../controllers/worker/workerApiController.js"

const router = Router()

router.get('/api/workers', workerApiController.getAllWorkers);
router.get('/api/workers/:id', workerApiController.getWorkerById);

export default router