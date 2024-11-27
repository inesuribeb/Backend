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

export const functions={
    getAll,
    getById
}

export default functions