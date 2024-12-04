import { Router } from "express";
import workerApiController from "../controllers/worker/workerApiController.js"
import authApiController from "../controllers/auth/authApiController.js"
import { isWorker, isAdmin } from "../controllers/middleware/authMiddleware.js";

const router = Router()

router.get('/api/workers', isAdmin, workerApiController.getAllWorkers);
router.get('/api/workers/:id', isWorker, workerApiController.getWorkerById);
router.post('/api/workers/create', isAdmin, workerApiController.createWorkerAPI);
router.put('/api/workers/:id/update', isWorker, workerApiController.updateWorkerAPI);
router.delete('/api/workers/:id/delete', isAdmin, workerApiController.deleteWorkerAPI);

router.post('/api/workers/login', authApiController.loginWorker);



export default router