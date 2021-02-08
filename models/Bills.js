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
   * @param {string} name 
   * @param {string} description 
   * @param {string} closing_date 
   */
  static async addOne(government_id, name, description, closing_date) {
    return db.run(`INSERT INTO bills 
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
  }

  /**
   * Update a bill
   * 
   * @param {number} government_id 
   * @param {string} name 
   * @param {string} description 
   * @param {string} closing_date 
   */
  static async updateOne(name, description, closing_date, old_bill) {
    return db.run(`UPDATE bills
      SET 
        ${db.columnNames.name} = '${name}',
        ${db.columnNames.description} = '${description}',
        ${db.columnNames.closing_date} = '${closing_date}'
      WHERE
        ${db.columnNames.government_id} = '${old_bill.government_id}' AND
        ${db.columnNames.name} = '${old_bill.name}' AND
        ${db.columnNames.description} = '${old_bill.description}' AND
        ${db.columnNames.closing_date} = '${old_bill.closing_date}' 
    `)
  }

  /**
   * Delete bill
   */
  static async deleteOne(bill_id) {
    return db.run(`DELETE FROM bills WHERE ${db.columnNames.bill_id} = '${bill_id}'`)
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
  static async findByID(bill_id) {
    return db.get(`SELECT * FROM bills WHERE ${db.columnNames.bill_id} = '${bill_id}'`);
  }

  /**
   * Return bills for government_id
   * @param {number} government_id 
   * @return {Bill}
   */
  static async findByGovernmentID(government_id) {
    return db.all(`SELECT * FROM bills WHERE ${db.columnNames.government_id} = '${government_id}'`);
  }

}



module.exports = Bills;
