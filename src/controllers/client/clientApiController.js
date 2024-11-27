import clientController from "./clientController.js"


async function showClients(req, res) {
    try {
        const clients = await clientController.showClients();
        res.status(200).json({
            success: true,
            data: clients
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
}

async function showClientById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const client = await clientController.getClientById(id);

        if (!client) {
            return res.status(404).json({
                status: 'error',
                message: `Did not find client with id ${id}`
            });
        }

        res.status(200).json({
            success: true,
            data: client
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        });
    }
}

export const functions = {
    showClients,
    showClientById
}

export default functions;