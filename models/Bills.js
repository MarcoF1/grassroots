const db = require('../db/db_config');

/**
 * @typeof Bills
 * 
 * @prop {number} bill_id 
 * @prop {number} government_id 
 * @prop {string} name 
 * @prop {string} description 
 * @prop {string} closing_date 
 * @prop {string} bill_status 
 */

 let db_name = 'bills'

/**
 * @class Bills
 * 
 * Stores all Bills.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Bills {
  /**
   * Add a bill
   * 
   * @param {number} government_id 
   * @param {string} name 
   * @param {string} description 
   * @param {string} closing_date 
   */
  static async addOne(government_id, name, description, closing_date) {
    return db.run(`INSERT INTO ${db_name} 
      (
        ${db.columnNames.government_id},
        ${db.columnNames.name},
        ${db.columnNames.description},
        ${db.columnNames.closing_date}
      ) 
      VALUES 
      (
        '${government_id}',
        '${name}',
        '${description}',
        '${closing_date}'
      )`)
      .then(
        () => {
          return db.get(`SELECT * FROM ${db_name} WHERE
            ${db.columnNames.government_id} = '${government_id}' AND
            ${db.columnNames.description} = '${description}' AND
            ${db.columnNames.name} = '${name}' AND
            ${db.columnNames.closing_date} = '${closing_date}'
            `)
        }
      )
  }

  /**
   * Update a bill
   * 
   * @param {number} government_id 
   * @param {string} name 
   * @param {string} description 
   * @param {string} closing_date 
   * @param {string} bill_status 
   */
  static async updateOne(name, description, closing_date, bill_status, bill_id) {
    return db.run(`UPDATE ${db_name} 
      SET 
        ${db.columnNames.name} = '${name}',
        ${db.columnNames.description} = '${description}',
        ${db.columnNames.closing_date} = '${closing_date}',
        ${db.columnNames.bill_status} = '${bill_status}'
      WHERE
        ${db.columnNames.bill_id} = '${bill_id}'
    `)
  }

  /**
   * Delete bill
   */
  static async deleteOne(bill_id) {
    return db.run(`DELETE FROM ${db_name} WHERE ${db.columnNames.bill_id} = '${bill_id}'`)
  }

  /**
   * Return an array of all of the Bills.
   * @return {Bills[]}
   */
  static async findAll() {
    return db.all(`SELECT * FROM ${db_name}`);
  }

  /**
   * Return bill with bill_id
   * @param {number} bill_id 
   * @return {Bill}
   */
  static async findByID(bill_id) {
    return db.get(`SELECT * FROM ${db_name} WHERE ${db.columnNames.bill_id} = '${bill_id}'`);
  }

  /**
   * Return bills for government_id
   * @param {number} government_id 
   * @return {Bill}
   */
  static async findByGovernmentID(government_id) {
    return db.all(`SELECT * FROM ${db_name} WHERE ${db.columnNames.government_id} = '${government_id}'`);
  }

}



module.exports = Bills;
