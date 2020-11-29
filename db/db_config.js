const sqlite3 = require('sqlite3');

let sqlDb;

const columnNames = {
  userID: "user_id",
  password: "password",
  userName: "username",
  vaccine: "vaccine",
  location: "location",
  rating: "rating",
  waitTime: "wait_time",
  date: "date"
};
Object.freeze(columnNames);

function createDb() {
  console.log("created our db!");
  sqlDb = new sqlite3.Database('bowlers170.db', function() {
    createUserTable();
    createVaccinesTable();
    createLocationsTable();
    createVaccineLocationsTable();
    createRatingsTable();
    createWaitTimesTable();
    createVaccineHistoryTable();
  });
};

function createUserTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS users (
    ${columnNames.userID} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${columnNames.userName} TEXT NOT NULL UNIQUE,
    ${columnNames.password} TEXT NOT NULL
  )`);
};

function createVaccinesTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS vaccines (
    ${columnNames.vaccine} TEXT PRIMARY KEY UNIQUE
  )`);
};

function createLocationsTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS locations (
    ${columnNames.location} TEXT PRIMARY KEY UNIQUE
  )`);
};

function createVaccineLocationsTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS vaccineLocations (
    ${columnNames.location} TEXT NOT NULL,
    ${columnNames.vaccine} TEXT NOT NULL,
    FOREIGN KEY (${columnNames.location}) REFERENCES locations(${columnNames.location}),
    FOREIGN KEY (${columnNames.vaccine}) REFERENCES vaccines(${columnNames.vaccine})
  )`);
};

function createRatingsTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS ratings (
    ${columnNames.location} TEXT NOT NULL,
    ${columnNames.rating} INTEGER,
    FOREIGN KEY (${columnNames.location}) REFERENCES locations(${columnNames.location})
  )`);
};

function createWaitTimesTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS waitTimes (
    ${columnNames.location} TEXT NOT NULL,
    ${columnNames.waitTime} INTEGER NOT NULL,
    FOREIGN KEY (${columnNames.location}) REFERENCES locations(${columnNames.location})
  )`);
};

function createVaccineHistoryTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS vaccineHistory (
    ${columnNames.userID} INTEGER NOT NULL,
    ${columnNames.location} TEXT,
    ${columnNames.vaccine} TEXT NOT NULL,
    ${columnNames.date} TEXT NOT NULL,
    FOREIGN KEY (${columnNames.location}) REFERENCES locations(${columnNames.location}),
    FOREIGN KEY (${columnNames.userID}) REFERENCES users(${columnNames.userID})
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