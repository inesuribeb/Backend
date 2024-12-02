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

export const functions = {
    getAllWorkers,
    getWorkerById,
    createWorkerAPI
}

export default functions;