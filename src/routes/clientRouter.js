import { Router } from "express";
import clientApiController from "../controllers/client/clientApiController.js"
import authApiController from "../controllers/auth/authApiController.js"
import { isWorker,verifyClient, allAllowed, isAdmin, isClient } from "../controllers/middleware/authMiddleware.js";

const router = Router()

router.get('/api/clients', isWorker, clientApiController.showClients);
router.get('/api/clients/:id', [verifyClient, allAllowed], clientApiController.showClientById);
router.post('/api/clients/create', isAdmin, clientApiController.createClientAPI);
router.put('/api/clients/:id/update', [verifyClient, isClient, isAdmin], clientApiController.updateClientAPI);
router.delete('/api/clients/:id/delete', [verifyClient, isClient, isAdmin], clientApiController.removeClientAPI);

router.post('/api/clients/login', authApiController.loginClient);
router.post('/api/clients/register', authApiController.registerClient);



export default router