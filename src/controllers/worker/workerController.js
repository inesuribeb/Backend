import workerModel from "../../models/workerModel.js"
import bcrypt from '../../config/bcrypt.js';


class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}


async function getAll(){

    const workers = await workerModel.findAll({
        order: [
            ['name', 'ASC']
        ],
    });
    if (!workers || workers.length === 0) {
        throw new CustomError('No workers found', 404);
    }
    return workers;
}

async function getById(id){
    const worker = await workerModel.findByPk(id);
    if (!worker) {
        throw new CustomError('Worker not found', 404);
    }
    return worker; 
}

// Crear trabajador
async function createWorker(name, last_name, email, password, rol) {
    
    const existingWorker = await workerModel.findOne({ where: { email } });
    if (existingWorker) {
        throw new Error('Email already exists');
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newWorker = await workerModel.create({
        name,
        last_name, 
        email,
        password: hashedPassword,
        rol
    });
 
    return newWorker;
 }

export const functions={
    getAll,
    getById,
    createWorker
}

export default functions