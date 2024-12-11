import authController from "./authController.js";
import jwt from "../../config/jwt.js";

async function registerClient(req, res) {
    try {
        const { name, surname, email, phone, password, passwordConfirm, dni, address, country_id } = req.body;
        const result = await authController.registerClient(
            name,
            surname, 
            email,
            phone,
            password,
            passwordConfirm,
            dni,
            address,
            country_id
        );
        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        let status = 500;
        if (error.message.includes('exists')) status = 409;
        if (error.message.includes('match')) status = 400;
 
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
 }

 async function loginClient(req, res) {
    try {
        const { email, password } = req.body;
        const client = await authController.loginClient(email, password);
        const token = jwt.sign({ user_id: client.user_id, rol: "client" }, '24h' );
        res.json({
            success: true,
            token,
            user_id
        });
    } catch (error) {
        const status = error.message.includes('not found') || 
                      error.message.includes('Invalid') ? 401 : 500;
        res.status(status).json({
            success: false,
            message: error.message 
        });
    }
 }

 async function loginWorker(req, res) {
    try {
        const { email, password } = req.body;
        const worker = await authController.loginWorker(email, password);
        const token = jwt.sign(
            { 
                worker_id: worker.worker_id,
                rol: worker.rol 
            },
            '24h' 
        );
        res.json({
            success: true,
            token
        });
    } catch (error) {
        res.status(error.message.includes('not found') || 
                  error.message.includes('Invalid') ? 401 : 500)
           .json({
                success: false,
                message: error.message 
           });
    }
}

 export default {
    registerClient,
    loginClient,
    loginWorker
}