const db = require('../db/db_config');

/**
 * @typeof Pharmacies
 * 
 * @prop {string} location - location of the pharmacy
 * @prop {string} vaccine - vaccine available at the pharmacy
 */

/**
 * @class Pharmacies
 * 
 * Stores all Pharmacies.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Pharmacies {
  /**
   * Add a Pharmacy.
   * 
   * @param {string} location - Pharmacy location
   * @param {string} vaccine - Vaccine available
   * @return {Pharmacy} - created Pharmacy
   */
  static async addOne(location, vaccine) {
    return db.run(`INSERT INTO vaccineLocations (${db.columnNames.location},
              ${db.columnNames.vaccine}) VALUES ('${location}', '${vaccine}')`)
              .then(() => Pharmacies.findOne(location));
  }

  /**
   * Find a Pharmacy by location.
   * @param {string} location - location of Pharmacy to find
   * @return {Pharmacy | undefined} - found Pharmacy
   */
  static async findOne(location) {
    return db.get(`SELECT * FROM vaccineLocations WHERE ${db.columnNames.location} = '${location}'`);
  }

  /**
   * Return an array of all of the Pharmacies.
   * @return {Pharmacy[]}
   */
  static async findAll() {
    return db.all(`SELECT * FROM vaccineLocations`);
  }
}

module.exports = Pharmacies;
