import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const UserPacks = sequelize.define('User_book_Packs', {
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
        type: DataTypes.TIMESTAMP
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
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

UserPacks.belongsTo(Pack, {
    foreignKey: 'pack_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

UserPacks.belongsTo(Source, {
    foreignKey: 'source_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

export default UserPacks;