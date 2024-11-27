import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

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



export default Pack;

