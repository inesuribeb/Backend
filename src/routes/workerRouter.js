import { Router } from "express";
import workerApiController from "../controllers/worker/workerApiController.js"

const router = Router()

router.get('/api/workers', workerApiController.getAllWorkers);
router.get('/api/workers/:id', workerApiController.getWorkerById);
router.post('/api/workers/create', workerApiController.createWorkerAPI);
router.put('/api/workers/:id/update', workerApiController.updateWorkerAPI);

export default router