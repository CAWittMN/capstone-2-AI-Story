"use strict";

const { sq } = require("../config/db");
const { DataTypes, Model } = require("sequelize");
const User = require("./user");
const Chapter = require("./chapter");

class Story extends Model {}
Story.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a title",
        },
      },
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    genImages: {
      type: DataTypes.BOOLEAN,
    },
    genAudio: {
      type: DataTypes.BOOLEAN,
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a prompt",
        },
      },
    },
    char_success: {
      type: DataTypes.BOOLEAN,
    },
    curr_summary: {
      type: DataTypes.TEXT,
    },
    max_chapters: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: sq,
    modelName: "Story",
  }
);

Story.hasMany(Chapter);
Story.belongsTo(User);

module.exports = Story;
