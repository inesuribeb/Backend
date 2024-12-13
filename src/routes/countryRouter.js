import countryApiController from "../controllers/country/countryApiController.js"
import { Router } from "express";

const router = Router()

router.get('/api/countries', countryApiController.getAllCountries);


export default router

