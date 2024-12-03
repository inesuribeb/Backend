import { Router } from "express";
import clientApiController from "../controllers/client/clientApiController.js"
import authApiController from "../controllers/auth/authApiController.js"

const router = Router()

router.get('/api/clients', clientApiController.showClients);
router.get('/api/clients/:id', clientApiController.showClientById);
router.post('/api/clients/create', clientApiController.createClientAPI);
router.put('/api/clients/:id/update', clientApiController.updateClientAPI);
router.delete('/api/clients/:id/delete', clientApiController.removeClientAPI);

router.post('/api/clients/login', authApiController.loginClient);
router.post('/api/clients/register', authApiController.registerClient);



export default router