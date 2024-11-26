import {Router} from "express";

const router = Router();

router.get("/", (req,res)=>(
    res.send('Holasss Mundo')
))

//para hacer una api
router.get("/json", (req,res)=>(
    res.json({id:1,username:"admin",password:1234})
))


router.get("/form",(req,res)=>{
    res.send(`
        <form method="POST" action="/form">
        <input type="text" name="name" placeholder="enter name">
        <button type="submit">Send</button>
        </form>
        `)
    })

router.post("/form",(req,res)=>{
    const username =req.body.name;
    res.send("<h1>Hola "+username+"</h1>");
})

router.get("/users",(req,res)=>{
    res.json(usuarios);
})

router.get("/users/:userId",(req,res)=>{
    const userId = req.params.userId;
    const showPassword = req.query.password || false;
    const user = usuarios.find(u=>u.id=userId);
    if(showPassword !== "true"){
        const filteredUser = {
            id:user.id,
            nombre:user.nombre,
            email:user.email
        }
        return res.json(filteredUser);
    }
    res.json(user);
})

export default router;