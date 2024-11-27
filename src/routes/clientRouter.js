import { Router } from "express";
import clientApiController from "../controllers/client/clientApiController.js"

const router = Router()

router.get('/api/clients', clientApiController.showClients);
router.get('/api/clients/:id', clientApiController.showClientById);

export default router