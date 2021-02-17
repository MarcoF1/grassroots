const db = require('../db/db_config');

/**
 * @typeof Resource
 * 
 * @prop {number} resource_id 
 * @prop {number} government_id 
 * @prop {string} name 
 * @prop {string} url 
 * @prop {string} description 
 */

let db_name = 'resources';

/**
 * @class Resource
 * 
 * Stores all Resources.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Resources {
  /**
   * Add a bill
   * 
   * @param {number} government_id 
   * @param {string} name 
   * @param {string} url 
   * @param {string} description 
   */
  static async addOne(government_id, url, name, description) {
    return db.run(`INSERT INTO ${db_name}
      (
        ${db.columnNames.government_id},
        ${db.columnNames.name},
        ${db.columnNames.url},
        ${db.columnNames.description}
      ) 
      VALUES 
      (
        '${government_id}',
        '${name}',
        '${url}',
        '${description}'
      )`)
      .then(
        () => {
          return db.get(`SELECT * FROM ${db_name} WHERE
            ${db.columnNames.government_id} = '${government_id}' AND
            ${db.columnNames.description} = '${description}' AND
            ${db.columnNames.url} = '${url}' AND
            ${db.columnNames.name} = '${name}'
            `)
        }
      )
  }

  /**
   * Update a resource
   * 
   * @param {number} government_id 
   * @param {string} name 
   * @param {string} url 
   * @param {string} description 
   */
  static async updateOne(name, description, url, resource_id) {
    return db.run(`UPDATE ${db_name}
      SET 
        ${db.columnNames.name} = '${name}',
        ${db.columnNames.url} = '${url}',
        ${db.columnNames.description} = '${description}'
      WHERE
        ${db.columnNames.resource_id} = '${resource_id}'
    `)
  }

  /**
   * Delete resource
   */
  static async deleteOne(resource_id) {
    return db.run(`DELETE FROM ${db_name} WHERE ${db.columnNames.resource_id} = '${resource_id}'`)
  }

  /**
   * Return resource with resource_id
   * @param {number} resource_id 
   * @return {Resource}
   */
  static async findByID(resource_id) {
    return db.get(`SELECT * FROM ${db_name} WHERE ${db.columnNames.resource_id} = '${resource_id}'`);
  }

  /**
   * Return resources for government_id
   * @param {number} government_id 
   * @return {Resource[]}
   */
  static async findByGovernmentID(government_id) {
    return db.all(`SELECT * FROM ${db_name} WHERE ${db.columnNames.government_id} = '${government_id}'`);
  }

}



module.exports = Resources;
