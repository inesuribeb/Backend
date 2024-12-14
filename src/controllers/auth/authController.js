import clientController from "../client/clientController.js"
import workerController from "../worker/workerController.js"
import { verifyPassword } from "../../config/bcrypt.js";


// async function registerClient(name, surname, email, phone, password, passwordConfirm, dni, address, country_id) {
//     if(password !== passwordConfirm) {
//         throw new Error('Passwords do not match');
//     }
 
//     const existingClient = await clientController.getByEmail(email);
//     if(existingClient) {
//         throw new Error('Email already exists');
//     }
 
//     const existingDNI = await clientController.findOneClient({ where: { dni }});
//     if(existingDNI) {
//         throw new Error('DNI already exists');
//     }
 
//     const newClient = await clientController.createClient(
//         name, 
//         surname, 
//         email, 
//         phone,
//         password,
//         dni,
//         address,
//         country_id
//     );
 
//     return newClient;
//  }

async function registerClient(name, surname, email, phone, password, passwordConfirm, dni, address, country_id) {
    try {
        if(password !== passwordConfirm) {
            throw new Error('Passwords do not match');
        }

        console.log('Datos recibidos en registerClient:', {
            name, surname, email, phone, dni, address, country_id
        });
     
        const existingClient = await clientController.getByEmail(email);
        if(existingClient) {
            throw new Error('Email already exists');
        }
     
        const existingDNI = await clientController.findOneClient({ where: { dni }});
        if(existingDNI) {
            throw new Error('DNI already exists');
        }
     
        const newClient = await clientController.createClient(
            name, 
            surname, 
            email, 
            phone,
            password,
            dni,
            address,
            country_id
        );
     
        return newClient;
    } catch (error) {
        console.error('Error en registerClient:', error);
        throw error;
    }
}


 async function loginClient(email, password) {
    const client = await clientController.getByEmail(email);
    if (!client) {
        throw new Error('Client not found');
    }
 
    const isPasswordValid = await verifyPassword(password, client.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
 
    return client;
 }

 async function loginWorker(email, password) {
    const worker = await workerController.getByEmail(email);
    if (!worker) {
        throw new Error('Worker not found');
    }
 
    const isPasswordValid = await verifyPassword(password, worker.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
 
    return worker;
 }

 export default{
    registerClient,
    loginClient,
    loginWorker
}