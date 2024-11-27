import userBooksModel from "../../models/userBooksModel.js"
import Client from "../../models/clientModel.js";
import Pack from "../../models/packModel.js";
import Source from "../../models/refSourcesModel.js";

// Todas las reservas
async function showReservations() {
    const reservations = await userBooksModel.findAll({
        include: [
            { model: Client, as: 'Client' },
            { model: Pack, as: 'Pack' },
            { model: Source, as: 'Source' }
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
            { model: Client, as: 'Client' },
            { model: Pack, as: 'Pack' },
            { model: Source, as: 'Source' }
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


 export const functions={
    showReservations,
    getReservationById
 }

 export default functions