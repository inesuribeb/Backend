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

 // Crear reserva
 async function createReservationAPI(req, res) {
    try {
        const { user_id, pack_id, source_id, message, requested_dates } = req.body;
 
        if (!user_id || !pack_id || !source_id || !requested_dates) {
            return res.status(400).json({
                success: false,
                message: 'Required fields: user_id, pack_id, source_id and requested_dates'
            });
        }
 
        const newReservation = await ubpController.createReservation(
            user_id,
            pack_id,
            source_id,
            message,
            requested_dates
        );
 
        res.status(201).json({
            success: true,
            data: newReservation
        });
 
    } catch (error) {
        if (error.message === 'Client not found' || 
            error.message === 'Pack not found' || 
            error.message === 'Source not found') {
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

 // Cliente cancela reserva
 async function cancelReservationAPI(req, res) {
    try {
        const { id } = req.params; 
        const { user_id, pack_id } = req.body; 
 
        if (!id || !user_id || !pack_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing required IDs'
            });
        }
 
        const cancelledReservation = await ubpController.cancelReservation(
            id,
            user_id,
            pack_id
        );
 
        res.status(200).json({
            success: true,
            message: 'Reservation cancelled successfully',
            data: cancelledReservation
        });
 
    } catch (error) {
        if (error.message === 'Reservation not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
 
        if (error.message === 'Cannot cancel a reservation that is already completed or cancelled') {
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

 // Actualizar reserva para que el worker apruebe, cancele, o complete la reserva
 async function updateReservationStatusAPI(req, res) {
    try {
        const { id } = req.params;
        const { user_id, pack_id, newStatus } = req.body;

        // Validar que tenemos todos los datos necesarios
        if (!id || !user_id || !pack_id || !newStatus) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const updatedReservation = await ubpController.updateReservationStatus(
            id,
            user_id,
            pack_id,
            newStatus
        );

        res.status(200).json({
            success: true,
            message: `Reservation status updated to ${newStatus} successfully`,
            data: updatedReservation
        });

    } catch (error) {
        if (error.message === 'Reservation not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        if (error.message === 'Invalid status' || 
            error.message === 'Cannot change status of a completed reservation' ||
            error.message === 'Cannot change status of a cancelled reservation' ||
            error.message === 'Reservation must be approved before marking as completed') {
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



export const functions={
    getAllReservations,
    showReservationById,
    createReservationAPI,
    cancelReservationAPI,
    updateReservationStatusAPI
}

export default functions