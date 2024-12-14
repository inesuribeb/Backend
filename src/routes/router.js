import {Router} from "express";
import clientRouter from "./clientRouter.js"
import workerRouter from "./workerRouter.js"
import packRouter from "./packRouter.js"
import reservationRouter from "./reservationRouter.js"
import countryRouter from "./countryRouter.js"
import refsourcesRouter from "./refsourcesRouter.js"

const router = Router();

router.get("/", (req,res)=>(
    res.send('Holasss Mundo')
))



router.use("/client", clientRouter)
router.use("/worker", workerRouter)
router.use("/pack", packRouter)
router.use("/reservations", reservationRouter)
router.use("/countries", countryRouter)
router.use("/source", refsourcesRouter)




export default router;