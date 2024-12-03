import { Router } from "express";
import workerApiController from "../controllers/worker/workerApiController.js"
import authApiController from "../controllers/auth/authApiController.js"

const router = Router()

router.get('/api/workers', workerApiController.getAllWorkers);
router.get('/api/workers/:id', workerApiController.getWorkerById);
router.post('/api/workers/create', workerApiController.createWorkerAPI);
router.put('/api/workers/:id/update', workerApiController.updateWorkerAPI);
router.delete('/api/workers/:id/delete', workerApiController.deleteWorkerAPI);

router.post('/api/workers/login', authApiController.loginWorker);



export default router