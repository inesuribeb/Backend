import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Country = sequelize.define('Country', {
    country_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    iso_code:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    prefix:{
        type: DataTypes.STRING,
        allowNull:false,
    }
})

export default Country;