import { DataTypes, Op } from "sequelize";
import { sequelize } from "../connection.db.js";
export const users = [];

export const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "U_id",
    },
    userName: {
      type: DataTypes.STRING,
      field: "U-name",
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
      field: "U-email",
    },
    password: {
      type: DataTypes.STRING,
      field: "U_password",
      validate: {
        checkPasswordLength() {
          if (this.password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
          }
        }
      },
    },
    role: {
      type: DataTypes.ENUM(["admin", "user"]),
      field: "U_role",
    },
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
        if (!user.userName || user.userName.length < 2) {
          throw new Error("User name must be longer than 2 characters");
        }
      }
    }
  }
);
