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

export const functions = {
    getAllWorkers,
    getWorkerById
}

export default functions;