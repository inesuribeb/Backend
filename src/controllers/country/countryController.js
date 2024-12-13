import countryModel from "../../models/countryModel.js"


// Ver todos los paises
async function showCountries() {
    const countries = await countryModel.findAll({
    });

    if (!countries || countries.length === 0) {
        throw new Error('No countries found');
    }

    return countries;
}

export const functions={
    showCountries
}

export default functions;