import clientModel from "../../models/clientModel"
import countryModel from "../../models/countryModel"

async function showClients() {
    const clients = await clientModel.findAll({
        include: countryModel
    });

    if (!clients || clients.length === 0) {
        throw new Error('No clients found');
    }

    return cleanClientsWithCountry(clients);
}

function cleanClientsWithCountry(clients) {
    return clients.map(client => {
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

export const functions = {
    showClients
}

export default functions;