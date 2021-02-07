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
   * @param {string} contact 
   * @param {string} address 
   */
  static async addOne(name, description, contact, address, user_id) {
    return db.run(`INSERT INTO governments 
      (
        ${db.columnNames.name},
        ${db.columnNames.description},
        ${db.columnNames.contact},
        ${db.columnNames.address}
      ) 
      VALUES 
      (
        '${name}',
        '${description}',
        '${contact}',
        '${address}'
      )`)
      .then(
        () => {
          return db.get(`SELECT * FROM governments WHERE
            ${db.columnNames.name} = '${name}' AND
            ${db.columnNames.description} = '${description}' AND
            ${db.columnNames.contact} = '${contact}' AND
            ${db.columnNames.address} = '${address}'
            `)
        }
      )
      .then(
        (gov) => {
          this.addUser(gov.government_id, user_id, true)
        }
      )
  }

  /**
   * Update a government
   * 
   * @param {string} name 
   * @param {string} description 
   * @param {string} contact 
   * @param {string} address 
   * @param {Government} old_gov 
   */
  static async addOne(name, description, contact, address, old_gov) {
    return db.run(`UPDATE governments
      SET 
        ${db.columnNames.name} = ${name},
        ${db.columnNames.description} = ${description},
        ${db.columnNames.contact} = ${contact},
        ${db.columnNames.address} = ${address},
      WHERE
        ${db.columnNames.name} = '${old_gov.name}' AND
        ${db.columnNames.description} = '${old_gov.description}' AND
        ${db.columnNames.contact} = '${old_gov.contact}' AND
        ${db.columnNames.address} = '${old_gov.address}' 
    `)
  }

  /**
   * Delete government
   */
  static async deleteOne(government_id) {
    return db.run(`DELETE FROM governments WHERE ${db.columnNames.government_id} = '${government_id}'`)
  }

  /**
   * Return an array of all of the Governments.
   * @return {Governments[]}
   */
  static async findAll() {
    return db.all(`SELECT * FROM governments`)
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
   * @param {number} user_id 
   * @return {Governments[]}
   */
  static async userGovernments(user_id) {
    return db.all(`SELECT * FROM user_governments WHERE ${db.columnNames.user_id} = '${user_id}'`);
  }

  /**
   * Return users in a government
   * @param {number} government_id 
   * @return {Governments[]}
   */
  static async governmentUsers(government_id) {
    return db.all(`SELECT * FROM user_governments WHERE ${db.columnNames.government_id} = '${government_id}'`);
  }

  /**
   * Add new user to government
   * @param {number} government_id 
   * @param {number} user_id 
   * @param {boolean} is_rep 
   * @return {Governments[]}
   */
  static async addUser(government_id, user_id, is_rep = false) {
    return db.run(`INSERT INTO user_governments 
      (${db.columnNames.government_id},${db.columnNames.user_id}, ${db.columnNames.is_rep}) 
      VALUES ('${government_id}','${user_id}', '${is_rep}')`);
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
