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

// Middleware para verificar los roles
const checkRole = (allowedRole) => async (req, res, next) => {
    try {
        const verified = verifyToken(req, res);
        if(verified.error) {
            return res.status(401).json({ error: "jwt token not correct" });
        }
        
        if(!verified.rol || verified.rol !== allowedRole) {
            return res.status(403).json({ error: "not allowed" });
        }
        
        req.user = verified; 
        next();
    } catch (error) {
        return res.status(401).json({ error: "jwt token not valid" });
    }
}

export const isAdmin = checkRole('admin');
export const isFounder = checkRole('founder');
export const isClient = checkRole('client');