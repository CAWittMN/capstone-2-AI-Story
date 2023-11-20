const { Model, DataTypes } = require("sequelize");
const db = require("../db");
const Story = require("./story");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class User extends Model {
  stories;
  static async register(info) {
    const duplicateCheck = await User.findOne({
      where: { username: info.username },
    });
    if (duplicateCheck) {
      throw new BadRequestError(`Duplicate username: ${info.username}`);
    }
    info.password = await bcrypt.hash(info.password, BCRYPT_WORK_FACTOR);
    const newUser = await User.create({ ...info, isAdmin: false });
    delete newUser.dataValues.password;
    return newUser;
  }
  static async login(username, password) {
    const user = await User.findOne({ where: { username } });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        delete user.dataValues.password;
        return user;
      } else {
        throw new UnauthorizedError("Invalid username/password");
      }
    }
    throw new NotFoundError("No such user");
  }
  getStories() {}
}
User.init(
  {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: "User",
    tableName: "users",
  }
);

User.hasMany(Story, { as: "stories" });
Story.belongsTo(User, { as: "user" });

module.exports = User;
