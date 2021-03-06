const { Pool } = require("pg");
// const sqlite3 = require('sqlite3');

production = false;

// let sqlDb;
// Connect to the db using a pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: production ? { rejectUnauthorized: false } : false,
  database: "grassroots",
});

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
  closing_date: "closing_date",
  bill_status: "bill_status",

  resource_id: "resource_id",
  url: "url",
};
Object.freeze(columnNames);

// function createDb() {
//   console.log("created our db!");
//   sqlDb = new sqlite3.Database("db.db", function() {
//     createGovernmentsTable();
//     createUserTable();

//     createUserGovernmentsTable();

//     createBillsTable();

//     createResourcesTable();
//   });
// }
async function createDb() {
  // create user and shorts tables
  await createGovernmentsTable();
  await createUserTable();
  await createUserGovernmentsTable();
  await createBillsTable();
  await createResourcesTable();

  // await createUserTable();
  // await createShortsTable();
  // // create super user
  // await createSuperUser();
  console.log("created our db!");
}

async function createGovernmentsTable() {
  await pool.query(`CREATE TABLE IF NOT EXISTS governments (
    ${columnNames.government_id} SERIAL UNIQUE,
    ${columnNames.name} TEXT,
    ${columnNames.description} TEXT,
    ${columnNames.contact} TEXT,
    ${columnNames.address} TEXT
  )`);
}

async function createUserTable() {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    ${columnNames.user_id} SERIAL UNIQUE,
    ${columnNames.username} TEXT NOT NULL UNIQUE,
    ${columnNames.password} TEXT NOT NULL
  )`);
}

async function createUserGovernmentsTable() {
  await pool.query(`CREATE TABLE IF NOT EXISTS user_governments (
    ${columnNames.user_id} INTEGER NOT NULL,
    ${columnNames.government_id} INTEGER NOT NULL,
    ${columnNames.is_rep} BOOLEAN,
    ${columnNames.description} TEXT NOT NULL,
    FOREIGN KEY (${columnNames.user_id}) 
    REFERENCES users(${columnNames.user_id}),
    FOREIGN KEY (${columnNames.government_id}) 
    REFERENCES governments(${columnNames.government_id})
  )`);
}

async function createBillsTable() {
  await pool.query(`CREATE TABLE IF NOT EXISTS bills (
    ${columnNames.bill_id} SERIAL UNIQUE,
    ${columnNames.government_id} INTEGER NOT NULL,
    ${columnNames.name} TEXT,
    ${columnNames.description} TEXT,
    ${columnNames.closing_date} TEXT,
    ${columnNames.bill_status} TEXT DEFAULT 'In Progress',
    FOREIGN KEY (${columnNames.government_id}) REFERENCES governments(${columnNames.government_id})
  )`);
}

async function createResourcesTable() {
  await pool.query(`CREATE TABLE IF NOT EXISTS resources (
    ${columnNames.resource_id} SERIAL UNIQUE,
    ${columnNames.government_id} INTEGER NOT NULL,
    ${columnNames.name} TEXT,
    ${columnNames.url} TEXT,
    ${columnNames.description} TEXT,
    FOREIGN KEY (${columnNames.government_id}) REFERENCES governments(${columnNames.government_id})
  )`);
}

// Helper wrapper functions that return promises that resolve when sql queries are complete.

function run(sqlQuery) {
  console.log(sqlQuery);
  return new Promise((resolve, reject) => {
    pool.query(sqlQuery, (err) => {
      if (err !== undefined) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function get(sqlQuery) {
  return new Promise((resolve, reject) => {
    pool.query(sqlQuery, (err, result) => {
      if (err !== undefined) {
        reject(err);
      } else {
        const results = { results: result ? result.rows[0] : null };
        resolve(results.results);
      }
    });
  });
}

function all(sqlQuery) {
  return new Promise((resolve, reject) => {
    pool.query(sqlQuery, (err, result) => {
      if (err !== undefined) {
        reject(err);
      } else {
        const results = { results: result ? result.rows : null };
        resolve(results.results);
      }
    });
  });
}

createDb();

module.exports = {
  columnNames,
  get,
  all,
  run,
};
