import userBooksModel from "../../models/userBooksModel.js"
import clientModel from "../../models/clientModel.js";
import packModel from "../../models/packModel.js";
import refSourcesModel from "../../models/refSourcesModel.js";

// Todas las reservas
async function showReservations() {
    const reservations = await userBooksModel.findAll({
        include: [
            { model: clientModel, as: 'Client' },
            { model: packModel, as: 'Pack' },
            { model: refSourcesModel, as: 'Source' }
        ]
    });
 
    if (!reservations || reservations.length === 0) {
        throw new Error('No reservations found');
    }
 
    return cleanReservations(reservations);
 }
 
 function cleanReservations(reservations) {
    return reservations.map(reservation => ({
        id: reservation.id,
        user_id: reservation.user_id,
        pack_id: reservation.pack_id,
        client: {
            name: reservation.Client.name,
            surname: reservation.Client.surname,
            email: reservation.Client.email
        },
        pack: {
            name: reservation.Pack.name,
            price: reservation.Pack.price,
            duration: reservation.Pack.duration
        },
        source: reservation.Source.name,
        status: reservation.status,
        application_date: new Date(reservation.application_date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        message: reservation.message,
        requested_dates: new Date(reservation.requested_dates).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }));
 }


 // Solo una reserva
 async function getReservationById(id) {
    const reservation = await userBooksModel.findByPk(id, {
        include: [
            { model: clientModel, as: 'Client' },
            { model: packModel, as: 'Pack' },
            { model: refSourcesModel, as: 'Source' }
        ]
    });
    if(!reservation){
        throw new Error('Reservation not found', 404);
    }
    
    return cleanReservation(reservation);
}

function cleanReservation(reservation) {
    return {
        id: reservation.id,
        user_id: reservation.user_id,
        pack_id: reservation.pack_id,
        client: {
            name: reservation.Client.name,
            surname: reservation.Client.surname,
            email: reservation.Client.email
        },
        pack: {
            name: reservation.Pack.name,
            price: reservation.Pack.price,
            duration: reservation.Pack.duration
        },
        source: reservation.Source.name,
        status: reservation.status,
        application_date: new Date(reservation.application_date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        message: reservation.message,
        requested_dates: new Date(reservation.requested_dates).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    };
}

// Crear reserva
async function createReservation(user_id, pack_id, source_id, message, requested_dates) {

    const client = await clientModel.findByPk(user_id);
    if (!client) {
        throw new Error('Client not found');
    }

    const pack = await packModel.findByPk(pack_id);
    if (!pack) {
        throw new Error('Pack not found');
    }

    const source = await refSourcesModel.findByPk(source_id);
    if (!source) {
        throw new Error('Source not found');
    }

    const newReservation = await userBooksModel.create({
        user_id,
        pack_id,
        source_id,
        status: 'required', 
        application_date: new Date(), 
        message: message || null, 
        requested_dates
    });

    return await userBooksModel.findByPk(newReservation.id, {
        include: [
            {
                model: clientModel,
                as: 'Client'
            },
            {
                model: packModel,
                as: 'Pack'
            },
            {
                model: refSourcesModel,
                as: 'Source'
            }
        ]
    });
}


// Actualizar reserva para que el cliente la cancele
async function cancelReservation(id, user_id, pack_id) {

    const reservation = await userBooksModel.findOne({
        where: {
            id,
            user_id,
            pack_id
        }
    });

    if (!reservation) {
        throw new Error('Reservation not found');
    }

    
    if (reservation.status === 'completed' || reservation.status === 'cancelled') {
        throw new Error('Cannot cancel a reservation that is already completed or cancelled');
    }

    reservation.status = 'cancelled';
    await reservation.save();

    return await userBooksModel.findOne({
        where: {
            id,
            user_id,
            pack_id
        },
        include: [
            { model: clientModel, as: 'Client' },
            { model: packModel, as: 'Pack' },
            { model: refSourcesModel, as: 'Source' }
        ]
    });
}



 export const functions={
    showReservations,
    getReservationById,
    createReservation,
    cancelReservation
 }

 export default functions