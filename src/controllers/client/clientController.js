import clientModel from "../../models/clientModel.js"
import countryModel from "../../models/countryModel.js"
import bcrypt from '../../config/bcrypt.js';



// Ver todos los clientes
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
            dni: client.dni,
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




// Ver un solo cliente
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
        dni: client.dni,
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

// Localizar un cliente por email
async function getByEmail(email) {
    const client = await clientModel.findOne({
        where: { email },
        include: countryModel
    });
    return client;
 }

 // Ver si ya existe un cliente con un criterio
 async function findOneClient(criteria) {
    const client = await clientModel.findOne(criteria);
    return client;
}


// Crear cliente
async function createClient(name, surname, email, phone, password, dni, address, country_id) {
    
    const existingClient = await clientModel.findOne({ where: { email } });
    if (existingClient) {
        throw new Error('Email already exists');
    }
  
    const existingDNI = await clientModel.findOne({ where: { dni } });
    if (existingDNI) {
        throw new Error('DNI already exists');
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newClient = await clientModel.create({
        name,
        surname, 
        email,
        phone,
        password: hashedPassword,
        dni,
        address,
        country_id
    });
 
    return newClient;
 }

// Actualizar cliente
 async function updatePersonalData(user_id, name, surname, email, phone, password, dni, address, country_id) {
    const client = await clientModel.findByPk(user_id);
    if(!client){
        throw new Error('Client not found');
    }
   
    if (email !== client.email) {
        const existingEmail = await clientModel.findOne({ where: { email }});
        if(existingEmail) throw new Error('Email already exists');
    }

    if (dni !== client.dni) {
        const existingDNI = await clientModel.findOne({ where: { dni }});
        if(existingDNI) throw new Error('DNI already exists');
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        client.password = hashedPassword;
    }

    Object.assign(client, { name, surname, email, phone, dni, address, country_id });
    await client.save();
    return client;
}


// Borrar cliente
async function removeClientProfile(user_id) {
    const client = await clientModel.findByPk(user_id);
    if(!client) throw new Error('Client not found');
    await client.destroy();
    return client;
}




export const functions = {
    showClients,
    getClientById,
    getByEmail,
    findOneClient,
    createClient,
    updatePersonalData,
    removeClientProfile
}

export default functions;