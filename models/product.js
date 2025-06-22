import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const Product = sequelize.define("productos", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})