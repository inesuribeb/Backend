import refsourcesApiController from "../controllers/refsources/refsourcesApiController.js"
import { Router } from "express";

const router = Router()

router.get('/api/sources', refsourcesApiController.getAllSources);


export default router