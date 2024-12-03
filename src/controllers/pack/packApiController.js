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


// Crear pack
async function createPackAPI(req, res) {
    try {
        const { name, description, price, active, duration } = req.body;
 
        if (!name || !description || !price || !duration) {
            return res.status(400).json({
                success: false,
                message: 'Required fields: name, description, price and duration'
            });
        }
 
        if (isNaN(price) || isNaN(duration)) {
            return res.status(400).json({
                success: false,
                message: 'Price and duration must be numbers'
            });
        }
 
        const newPack = await packController.createPack(
            name,
            description,
            price,
            active,
            duration
        );
 
        res.status(201).json({
            success: true,
            data: newPack
        });
 
    } catch (error) {
        if (error.message === 'Pack name already exists') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
 
        if (error.message === 'Price must be greater than 0' || 
            error.message === 'Duration must be greater than 0') {
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

 // Desactivar pack
 async function deactivatePackAPI(req, res) {
    try {
        const { id } = req.params;

        const updatedPack = await packController.deactivatePack(id);

        res.status(200).json({
            success: true,
            message: 'Pack deactivated successfully',
            data: updatedPack
        });

    } catch (error) {
        if (error.message === 'Pack not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        if (error.message === 'Pack is already inactive') {
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
    getAllPacks,
    getPackById,
    createPackAPI,
    deactivatePackAPI
}

export default functions;