import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Source = sequelize.define('ReferralSources', {
    source_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    }
})

export default Source;