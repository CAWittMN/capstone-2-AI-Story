const { sq } = require("../config/db");
const { DataTypes, Model } = require("sequelize");
const Story = require("./story");

class Chapter extends Model {}
Chapter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    audio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userPrompt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: sq,
    modelName: "chapter",
  }
);

Chapter.belongsTo(Story);

module.exports = Chapter;
