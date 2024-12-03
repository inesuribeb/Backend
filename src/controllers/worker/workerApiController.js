import workerController from "./workerController.js"

async function getAllWorkers(req, res) {
    try {
        const workers = await workerController.getAll();
        res.status(200).json({
            success: true,
            data: workers
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
}

async function getWorkerById(req, res) {
    try {
        const { id } = req.params;
        const worker = await workerController.getById(id);
        res.status(200).json({
            success: true,
            data: worker
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
}

// Crear trabajador
async function createWorkerAPI(req, res) {
    try {
        const { name, last_name, email, password, rol } = req.body;

        if (!name || !last_name || !email || !password || !rol) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const newWorker = await workerController.createWorker(
            name,
            last_name,
            email,
            password,
            rol
        );

        res.status(201).json({
            success: true,
            data: newWorker
        });

    } catch (error) {
        if (error.message === 'Email already exists') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// Actualizar Worker
async function updateWorkerAPI(req, res) {
    try {
        const worker_id = req.params.id;
        const { name, last_name, email, password, rol } = req.body;
 
        // Validar campos requeridos (excluyendo password que es opcional)
        if (!name || !last_name || !email || !rol) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }
 
        const updatedWorker = await workerController.updateWorker(
            worker_id,
            name,
            last_name,
            email,
            password,
            rol
        );
 
        res.status(200).json({
            success: true,
            data: updatedWorker
        });
 
    } catch (error) {
        if (error.message === 'Worker not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        
        if (error.message === 'Email already exists') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
 
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
 }

 //Borrar Worker
 async function deleteWorkerAPI(req, res) {
    try {
        const { id } = req.params;

        await workerController.deleteWorker(id);

        res.status(200).json({
            success: true,
            message: 'Worker deleted successfully'
        });

    } catch (error) {
        if (error.message === 'Worker not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const functions = {
    getAllWorkers,
    getWorkerById,
    createWorkerAPI,
    updateWorkerAPI,
    deleteWorkerAPI
}

export default functions;