import ubpController from "./ubpController.js"

async function getAllReservations(req, res) {
    try {
        const reservations = await ubpController.showReservations();
        res.status(200).json({
            success: true,
            data: reservations
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
}


async function showReservationById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const reservation = await ubpController.getReservationById(id);
 
        res.status(200).json({
            success: true,
            data: reservation
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
 }

export const functions={
    getAllReservations,
    showReservationById
}

export default functions