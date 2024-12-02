import { Router } from "express";
import clientApiController from "../controllers/client/clientApiController.js"

const router = Router()

router.get('/api/clients', clientApiController.showClients);
router.get('/api/clients/:id', clientApiController.showClientById);
router.post('/api/clients/create', clientApiController.createClientAPI);
router.put('/api/clients/:id/update', clientApiController.updateClientAPI);
router.delete('/api/clients/:id/delete', clientApiController.removeClientAPI);


export default router