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
  
  disctict_id: "disctict_id",
  address: "address",

  post_id: "post_id",
  timestamp: "timestamp"

};
Object.freeze(columnNames);

function createDb() {
  console.log("created our db!");
  sqlDb = new sqlite3.Database('db.db', function() {
    
    createDistrictTable();
    createUserTable();
    createPostsTable();
    createLikesTable()

  });
};


function createDistrictTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS districts (
    ${columnNames.disctict_id} INTEGER PRIMARY KEY,
    ${columnNames.address} TEXT NOT NULL
  )`);
};

function createUserTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS users (
    ${columnNames.user_id} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${columnNames.username} TEXT NOT NULL UNIQUE,
    ${columnNames.password} TEXT NOT NULL
  )`);
};


function createPostsTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS posts (
    ${columnNames.post_id} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${columnNames.is_item} BOOLEAN,
    ${columnNames.user_id} INTEGER NOT NULL,
    ${columnNames.username} INTEGER NOT NULL,
    ${columnNames.disctict_id} INTEGER,
    ${columnNames.tags} TEXT NOT NULL,
    ${columnNames.text} TEXT NOT NULL,
    ${columnNames.timestamp} TIMESTAMP NOT NULL,
    FOREIGN KEY (${columnNames.disctict_id}) REFERENCES districs(${columnNames.disctict_id})
  )`);
};

function createLikesTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS likes (
    ${columnNames.user_id} INTEGER KEY,
    ${columnNames.post_id} INTEGER KEY,
    FOREIGN KEY (${columnNames.user_id}) REFERENCES users(${columnNames.user_id})
    FOREIGN KEY (${columnNames.post_id}) REFERENCES posts(${columnNames.post_id})
  )`);
};

function createDislikesTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS dislikes (
    ${columnNames.user_id} INTEGER KEY,
    ${columnNames.post_id} INTEGER KEY,
    FOREIGN KEY (${columnNames.user_id}) REFERENCES users(${columnNames.user_id})
    FOREIGN KEY (${columnNames.post_id}) REFERENCES posts(${columnNames.post_id})
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