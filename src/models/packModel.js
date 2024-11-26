import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Country from './CountryModel.js';

const Pack = sequelize.define('Packs', {
    pack_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    price:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
    },
    active:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: 1
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

Client.belongsTo(Country, { 
    foreignKey: 'country_id', 
    onDelete: 'NO ACTION', 
    onUpdate: 'NO ACTION' 
});

Country.hasMany(Client, { 
    foreignKey: 'country_id' 
});

export default Worker;

