import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Worker = sequelize.define('Workers', {
    worker_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true, 
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    register_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('admin', 'founder'),
        allowNull:false
    }
})

export default Worker;