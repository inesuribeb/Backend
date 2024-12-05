import jwt from "../../config/jwt.js"

// Verifico el token
const verifyToken = (req, res) => {
    const authorization = req.headers.authorization;
    if(!authorization) {
        return { error: "jwt token needed" };
    }
    const token = authorization.replace("Bearer ","");
    return jwt.verify(token);
}
export const verifyClient =  async (req, res, next) => {
    try {
        const client_id =req.params.id;
        const verified = verifyToken(req, res);
        if(verified.error) {
            return res.status(401).json({ error: "jwt token not correct" });
        }
        if(client_id != verified.user_id){
            req.verified =false;
            next();
        }else{
            req.verified=true;
            next();

        }
       } catch (error) {
        return res.status(401).json({ error: "jwt token not valid" });
    }
}
export const verifyWorker =  async (req, res, next) => {
    try {
        const worker_id =req.params.id;
        const verified = verifyToken(req, res);
        if(verified.error) {
            return res.status(401).json({ error: "jwt token not correct" });
        }
        if(worker_id != verified.worker_id){
            req.verified =false;
            next();
        }else{
            req.verified=true;
            next();

        }
       } catch (error) {
        return res.status(401).json({ error: "jwt token not valid" });
    }
}
// Middleware para verificar los roles
const checkRole = (allowedRoles) => async (req, res, next) => {
    try {
        const verified = verifyToken(req, res);
        if(verified.error) {
            return res.status(401).json({ error: "jwt token not correct" });
        }
        console.log(req.verified);
        if((!req.verified)&& (!verified.rol || !allowedRoles.includes(verified.rol))) {
            return res.status(403).json({ error: "not allowed" });
        }
        
        req.user = verified; 
        next();
    } catch (error) {
        return res.status(401).json({ error: "jwt token not valid" });
    }
}

export const isAdmin = checkRole(['admin']);
export const isFounder = checkRole(['founder']);
export const isClient = checkRole(['client']);
export const isWorker = checkRole(['admin', 'founder']);
export const allAllowed = checkRole(['admin', 'founder', 'client']);