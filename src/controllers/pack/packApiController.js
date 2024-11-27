import packController from "./packController.js"

async function getAllPacks(req, res) {
    try {
        const packs = await packController.getAll();
        res.status(200).json({
            success: true,
            data: packs
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
}

async function getPackById(req, res) {
    try {
        const { id } = req.params;
        const pack = await packController.getById(id);
        res.status(200).json({
            success: true,
            data: pack
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
}

export const functions = {
    getAllPacks,
    getPackById
}

export default functions;