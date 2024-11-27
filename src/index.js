import express from "express";
import router from "./routes/router.js"



const app = express();

//meter aqui lo de pug lsd linesd spp.set de github

app.use(express.urlencoded({ extended: true }));// configurar body parser para recibir datos de formularios
app.use(express.json());// configurar body parser para recibir datos en formato json



app.use("/",router);



app.listen(3000,()=>console.log(`Estamos conectados en el puerto 3002`));

