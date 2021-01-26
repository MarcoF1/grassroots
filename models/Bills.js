const db = require('../db/db_config');

/**
 * @typeof Bills
 * 
 * @prop {number} bill_id 
 * @prop {number} government_id 
 * @prop {string} description 
 * @prop {string} closing_date 
 */

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
   * @param {string} description 
   * @param {string} closing_date 
   */
  static async addOne(government_id, description, closing_date) {
    return db.run(`INSERT INTO bills 
      (
        ${db.columnNames.government_id},
        ${db.columnNames.description},
        ${db.columnNames.closing_date}
      ) 
      VALUES 
      (
        '${government_id}',
        '${description}',
        '${closing_date}',
      )`)
  }

  /**
   * Return an array of all of the Bills.
   * @return {Bills[]}
   */
  static async findAll() {
    return db.all(`SELECT * FROM bills`);
  }

  /**
   * Return bill with bill_id
   * @param {number} bill_id 
   * @return {Bill}
   */
  static async findByID(government_id) {
    return db.get(`SELECT * FROM bills WHERE ${db.columnNames.bill_id} = '${bill_id}'`);
  }

}



module.exports = Bills;
