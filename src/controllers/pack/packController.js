import packModel from "../../models/packModel.js"

async function getAll(){

    const packs = await packModel.findAll();
    if (!packs || packs.length === 0) {
        throw new Error('No packs found');
    }
    return packs;
}

async function getById(id){
    const pack = await packModel.findByPk(id);
    if (!pack) {
        throw new Error('No pack found');
    }
    return pack; 
}

// Crear Pack
async function createPack(name, description, price, active, duration) {

    const existingPack = await packModel.findOne({ where: { name } });
    if (existingPack) {
        throw new Error('Pack name already exists');
    }
 
    if (price <= 0) {
        throw new Error('Price must be greater than 0');
    }
 
    if (duration <= 0) {
        throw new Error('Duration must be greater than 0');
    }
 
    const newPack = await packModel.create({
        name,
        description,
        price,
        active: active ?? true,
        duration
    });

    return newPack;
}

// Desactivar pack
async function deactivatePack(pack_id) {
    const pack = await packModel.findByPk(pack_id);
    
    if (!pack) {
        throw new Error('Pack not found');
    }

    if (!pack.active) {
        throw new Error('Pack is already inactive');
    }

    pack.active = false;
    await pack.save();

    return pack;
}

export const functions={
    getAll,
    getById,
    createPack,
    deactivatePack
}

export default functions