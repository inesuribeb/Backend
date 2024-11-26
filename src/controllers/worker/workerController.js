import workerModel from "../../models/workerModel"

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

export const functions={
    getAll,
    getById
}

export default functions