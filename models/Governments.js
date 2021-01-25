const db = require('../db/db_config');

/**
 * @typeof Government
 * 
 * @prop {number} government_id 
 * @prop {string} description 
 * @prop {string} contacts 
 */

/**
 * @class Government
 * 
 * Stores all Governments.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Governments {

  /**
   * Add a government
   * 
   * @param {string} name 
   * @param {string} description 
   */
  static async addOne(name, description) {
    return db.run(`INSERT INTO governments 
      (
        ${db.columnNames.name},
        ${db.columnNames.description}
      ) 
      VALUES 
      (
        '${name}',
        '${description}'
      )`)
  }

  /**
   * Return an array of all of the Governments.
   * @return {Governments[]}
   */
  static async findAll() {
    return db.all(`SELECT * FROM governments`);
  }

  /**
   * Return government with government_id
   * @param {number} government_id 
   * @return {Governments[]}
   */
  static async findByID(government_id) {
    return db.get(`SELECT * FROM governments WHERE ${db.columnNames.government_id} = '${government_id}'`);
  }

  /**
   * Return governments the user is a part of
   * @param {number} government_id 
   * @param {number} user_id 
   * @return {Governments[]}
   */
  static async userGovernments(user_id) {
    return db.all(`SELECT * FROM user_governments WHERE ${db.columnNames.user_id} = '${user_id}'`);
  }

  /**
   * Add new user to government
   * @param {number} government_id 
   * @param {number} user_id 
   * @return {Governments[]}
   */
  static async addUser(government_id, user_id) {
    return db.run(`INSERT INTO user_governments 
      (${db.columnNames.government_id},${db.columnNames.user_id}) 
      VALUES ('${government_id}','${user_id}')`);
  }

  /**
   * Remove user from government
   * @param {number} government_id 
   * @param {number} user_id 
   * @return {Governments[]}
   */
  static async removeUser(government_id, user_id) {
    return db.run(`DELETE FROM user_governments WHERE
      ${db.columnNames.user_id} = '${user_id}' AND
      ${db.columnNames.government_id} = '${government_id}'`);
  }
}


module.exports = Governments;
