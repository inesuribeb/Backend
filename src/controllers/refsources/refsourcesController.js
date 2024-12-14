import refSourcesModel from "../../models/refSourcesModel.js"


// Ver todos los paises
async function showSources() {
    const sources = await refSourcesModel.findAll({
    });

    if (!sources || sources.length === 0) {
        throw new Error('No sources found');
    }

    return sources;
}

export const functions={
    showSources
}

export default functions;