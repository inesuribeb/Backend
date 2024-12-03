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

// Localizar un worker por email
async function getByEmail(email) {
    const worker = await workerModel.findOne({
        where: { email },
    });
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

 // Actualizar Worker
 async function updateWorker(worker_id, name, last_name, email, password, rol) {
    const worker = await workerModel.findByPk(worker_id);
    if(!worker){
        throw new Error('Worker not found');
    }
   
    if (email !== worker.email) {
        const existingEmail = await workerModel.findOne({ where: { email }});
        if(existingEmail) throw new Error('Email already exists');
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        worker.password = hashedPassword;
    }

    Object.assign(worker, { name, last_name, email, rol });
    await worker.save();
    return worker;
}

// Borrar worker
async function deleteWorker(worker_id) {
    const worker = await workerModel.findByPk(worker_id);
    
    if (!worker) {
        throw new Error('Worker not found');
    }

    await worker.destroy();
    return { message: 'Worker deleted successfully' };
}

export const functions={
    getAll,
    getById,
    getByEmail,
    createWorker,
    updateWorker,
    deleteWorker
}

export default functions