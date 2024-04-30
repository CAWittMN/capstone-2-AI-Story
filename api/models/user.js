const db = require("../db");
const { Model, DataTypes } = require("sequelize");
const Story = require("./story");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../expressError");

/**
 * User model.
 * Represents a user.
 * Can register a new user by calling User.register().
 * Can login a user by calling User.login().
 */
class User extends Model {
  /**
   * Register a new user.
   * Hashes password and creates new user in database.
   * Returns the new user.
   */
  static async register(info) {
    // check for duplicate username
    const duplicateCheck = await User.findOne({
      where: { username: info.username },
    });
    if (duplicateCheck) {
      throw new BadRequestError(`Duplicate username: ${info.username}`);
    }
    // hash password
    info.password = await bcrypt.hash(info.password, BCRYPT_WORK_FACTOR);
    // create new user in database
    const newUser = await User.create({ ...info, isAdmin: false });
    delete newUser.dataValues.password; // remove password from returned user
    return newUser;
  }

  /**
   * Login a user.
   * Checks if username exists in database.
   * Checks if password is correct.
   * Returns the user if valid.
   * Throws an error if invalid.
   */
  static async login(username, password) {
    const user = await User.findOne({ where: { username } });
    if (user) {
      // check if password is valid
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        delete user.dataValues.password; // remove password from returned user
        return user;
      } else {
        throw new UnauthorizedError("Invalid username/password");
      }
    }
    throw new NotFoundError("No such user");
  }

  /**
   * Get all users including their stories.
   * sort by id
   */
  static async getAllUsers() {
    const users = await User.findAll({
      order: [["id", "ASC"]],
      include: { model: Story, as: "stories" },
    });
    return users;
  }
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
