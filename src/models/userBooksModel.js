import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Client from './clientModel.js';
import Pack from './packModel.js';
import Source from './refSourcesModel.js';

const UserPacks = sequelize.define('Users_book_Packs', {
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true, 
        references: {
            model: 'Clients',
            key: 'user_id'
        }
    },
    pack_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,  
        references: {
            model: 'Packs',
            key: 'pack_id'
        }
    },
    source_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'ReferralSources',
            key: 'source_id'
        }
    },
    status:{
        type: DataTypes.ENUM("required", "approved", "completed", "cancelled"),
        allowNull:false,
        defaultValue: "required"
    },
    application_date:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    message:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    requested_dates:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
})

UserPacks.belongsTo(Client, {
    foreignKey: 'user_id',
    as: 'Client',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

UserPacks.belongsTo(Pack, {
    foreignKey: 'pack_id',
    as: 'Pack',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

UserPacks.belongsTo(Source, {
    foreignKey: 'source_id',
    as: 'Source',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

export default UserPacks;