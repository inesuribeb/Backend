import refsourcesController from "./refsourcesController.js"

async function getAllSources(req, res) {
    try {
        const sources = await refsourcesController.showSources();
        res.status(200).json({
            success: true,
            data: sources
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
}

export const functions={
    getAllSources
}

export default functions;