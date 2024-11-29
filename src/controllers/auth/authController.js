import clientController from "../client/clientController.js"
import { verifyPassword } from "../../config/bcrypt.js";


async function registerClient(name, surname, email, phone, password, passwordConfirm, dni, address, country_id) {
    if(password !== passwordConfirm) {
        throw new Error('Passwords do not match');
    }
 
    const existingClient = await getByEmail(email);
    if(existingClient) {
        throw new Error('Email already exists');
    }
 
    const existingDNI = await clientController.findOne({ where: { dni }});
    if(existingDNI) {
        throw new Error('DNI already exists');
    }
 
    const newClient = await createClient(
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
 }


 async function loginClient(email, password) {
    const client = await getByEmail(email);
    if (!client) {
        throw new Error('Client not found');
    }
 
    const isPasswordValid = await verifyPassword(password, client.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
 
    return client;
 }

 export default{
    registerClient,
    loginClient
}