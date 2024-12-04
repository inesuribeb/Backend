import { Router } from "express";
import clientApiController from "../controllers/client/clientApiController.js"
import authApiController from "../controllers/auth/authApiController.js"
import { isWorker, allAllowed, isAdmin, isClient } from "../controllers/middleware/authMiddleware.js";

const router = Router()

router.get('/api/clients', isWorker, clientApiController.showClients);
router.get('/api/clients/:id', allAllowed, clientApiController.showClientById);
router.post('/api/clients/create', isAdmin, clientApiController.createClientAPI);
router.put('/api/clients/:id/update', isClient, clientApiController.updateClientAPI);
router.delete('/api/clients/:id/delete', isClient, clientApiController.removeClientAPI);

router.post('/api/clients/login', authApiController.loginClient);
router.post('/api/clients/register', authApiController.registerClient);



export default router