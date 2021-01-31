const sqlite3 = require('sqlite3');

let sqlDb;

const columnNames = {
  user_id: "user_id",
  password: "password",
  username: "username",
  is_rep: "is_rep",

  is_item: "is_item",
  text: "text",
  tags: "tags",
  deadline: "deadline",
  
  government_id: "government_id",
  name: "name",
  description: "description",
  contact: "contact",
  address: "address",

  bill_id: "bill_id",
  closing_date: "closing_date"

};
Object.freeze(columnNames);

function createDb() {
  console.log("created our db!");
  sqlDb = new sqlite3.Database('db.db', function() {
    
    createGovernmentsTable();
    createUserTable();

    createUserGovernmentsTable();

    createBillsTable();

  });
};


function createGovernmentsTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS governments (
    ${columnNames.government_id} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${columnNames.name} TEXT,
    ${columnNames.description} TEXT,
    ${columnNames.contact} TEXT,
    ${columnNames.address} TEXT
  )`);
};

function createUserTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS users (
    ${columnNames.user_id} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${columnNames.username} TEXT NOT NULL UNIQUE,
    ${columnNames.password} TEXT NOT NULL
  )`);
};

function createUserGovernmentsTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS user_governments (
    ${columnNames.user_id} INTEGER KEY,
    ${columnNames.government_id} INTEGER KEY,
    ${columnNames.is_rep} BOOLEAN,
    ${columnNames.description} TEXT,
    FOREIGN KEY (${columnNames.user_id}) REFERENCES users(${columnNames.user_id})
    FOREIGN KEY (${columnNames.government_id}) REFERENCES governments(${columnNames.government_id})
  )`);
};

function createBillsTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS bills (
    ${columnNames.bill_id} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${columnNames.government_id} INTEGER KEY,
    ${columnNames.name} INTEGER KEY,
    ${columnNames.description} TEXT,
    ${columnNames.closing_date} TEXT,
    FOREIGN KEY (${columnNames.government_id}) REFERENCES governments(${columnNames.government_id})
  )`);
};


// Helper wrapper functions that return promises that resolve when sql queries are complete.

function run(sqlQuery) {
  return new Promise((resolve, reject) => {
    sqlDb.run(sqlQuery, (err) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
};

function get(sqlQuery) {
  return new Promise((resolve, reject) => {
    sqlDb.get(sqlQuery, (err, row) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(row);
      }
    })
  });
};

function all(sqlQuery) {
  return new Promise((resolve, reject) => {
    sqlDb.all(sqlQuery, (err, rows) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  });
};

createDb();

module.exports = {
  columnNames,
  get,
  all,
  run,
};