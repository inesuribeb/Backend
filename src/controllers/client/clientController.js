import clientModel from "../../models/clientModel.js"
import countryModel from "../../models/countryModel.js"

// Todos los clientes
async function showClients() {
    const clients = await clientModel.findAll({
        include: countryModel
    });

    if (!clients || clients.length === 0) {
        throw new Error('No clients found');
    }

    return cleanClientsWithCountry(clients);
}


function cleanClientsWithCountry(client) {
    return client.map(client => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const formatedDate = new Date(client.register_date)
            .toLocaleDateString('es-ES', options);

        return {
            user_id: client.user_id,
            name: client.name,
            surname: client.surname,
            email: client.email,
            phone: client.phone,
            address: client.address,
            register_date: formatedDate,
            country: {
                name: client.Country.name,
                iso_code: client.Country.iso_code,
                prefix: client.Country.prefix
            }
        };
    });
}




// Un solo cliente
async function getClientById(user_id) {
    const client = await clientModel.findByPk(user_id, {
        include: countryModel
    });
    if(!client){
        throw new Error('Client not found', 404);
    }
    
    return cleanClientWithCountry(client);
}


function cleanClientWithCountry(client) {
    return {
        user_id: client.user_id,
        name: client.name,
        surname: client.surname,
        email: client.email,
        phone: client.phone,
        address: client.address,
        register_date: new Date(client.register_date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        country: {
            name: client.Country.name,
            iso_code: client.Country.iso_code,
            prefix: client.Country.prefix
        }
    };
}



export const functions = {
    showClients,
    getClientById
}

export default functions;