const db = require("../db/db_config");

/**
 * @typeof User
 *
 * @prop {number} user_id
 * @prop {string} username
 * @prop {string} password
 * @prop {number} district_id - users district
 * @prop {bool} is_rep - if they are rep for their district
 */

/**
 * @class Users
 *
 * Stores all Users.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Users {
  /**
   * Add a User.
   *
   * @param {string} username - User name
   * @param {string} password - User password
   * @return {User} - created user
   */
  static async addOne(username, password) {
    // first insert the user into the db then fetch the user from the DB
    return db
      .run(
        `INSERT INTO users (${db.columnNames.username},
                                     ${db.columnNames.password}) VALUES ('${username}', '${password}')`
      )
      .then(() => Users.findByUsername(username));
  }

  /**
   * Find a User by Name.
   * @param {string} username - name of User to find
   * @return {User | undefined} - found User
   */
  static async findByUsername(username) {
    return db.get(
      `SELECT * FROM users WHERE ${db.columnNames.username} = '${username}'`
    );
  }

  /**
   * Find a User by id.
   * @param {string} id
   * @return {User | undefined} - found User
   */
  static async findByID(id) {
    return db.get(
      `SELECT * FROM users WHERE ${db.columnNames.user_id} = '${id}'`
    );
  }

  /**
   * Return an array of all of the Users.
   * @return {User[]}
   */
  static async findAll() {
    return db.all(`SELECT * FROM users`);
  }

  /**
   * Update a Users username
   * @param {string} username - username of User
   * @param {string} new_username - new username for User
   * @return {User | undefined} - updated User
   */
  static async updateUsername(username, new_username) {
    console.log("updating username...");

    return db
      .run(
        `UPDATE users 
        SET ${db.columnNames.username} = '${new_username}' 
        WHERE ${db.columnNames.username} = '${username}'`
      )
      .then(() => {
        return Users.findByUsername(new_username);
      });
  }
  /**
   * Update a Users password
   * @param {string} username - username of User to find
   * @param {string} password - password of User to update
   * @return {User | undefined} - updated User
   */
  static async updatePassword(username, password) {
    return db
      .run(
        `UPDATE users 
        SET ${db.columnNames.password} = '${password}' 
        WHERE ${db.columnNames.username} = '${username}'`
      )
      .then(() => {
        return Users.findByUsername(username);
      });
  }

  /**
   * Like post
   * @param {string} username
   * @return {User | undefined} - updated User
   */
  static async likePost(username, post_id) {
    return Users.findByUsername(username).then((user) => {
      db.run(`INSERT INTO likes 
              (${db.columnNames.note_id},${db.columnNames.post_id}) 
              VALUES ('${user.user_id}','${post_id}')`);
    });
  }

  /**
   * Disike post
   * @param {string} username
   * @return {User | undefined} - updated User
   */
  static async dislikePost(username, post_id) {
    return Users.findByUsername(username).then((user) => {
      db.run(`INSERT INTO dislikes 
              (${db.columnNames.note_id},${db.columnNames.post_id}) 
              VALUES ('${user.user_id}','${post_id}')`);
    });
  }
}

module.exports = Users;
