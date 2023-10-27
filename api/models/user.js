"use strict";

const { sq } = require("../config/db.js");
const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config/config.js");
const Story = require("./story");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Please provide a username",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a password",
        },
        len: {
          args: [5, 30],
          msg: "Password must be between 8 and 30 characters",
        },
      },
      set(value) {
        this.setDataValue(
          "password",
          bcrypt.hashSync(value, BCRYPT_WORK_FACTOR)
        );
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    gender: {
      type: DataTypes.STRING(10),
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: sq,
    modelName: "User",
  }
);

User.hasMany(Story);

module.exports = User;
