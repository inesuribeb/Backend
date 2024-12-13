import countryController from "./countryController.js"

async function getAllCountries(req, res) {
    try {
        const countries = await countryController.showCountries();
        res.status(200).json({
            success: true,
            data: countries
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
}

export const functions={
    getAllCountries
}

export default functions;