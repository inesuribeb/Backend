import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Country from "./countryModel.js"

const Client = sequelize.define('Clients', {
    user_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    surname:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true 
    },
    phone:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    dni:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true 
    },
    address:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    register_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
            model: 'Country',
            key: 'country_id'
        }
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

export default Client;