const db = require('../db/db_config');

/**
 * @typeof Post
 * 
 * @prop {number} post_id 
 * @prop {number} user_id 
 * @prop {string} text 
 * @prop {string} tags 
 * @prop {number} is_item 
 */

/**
 * @class Posts
 * 
 * Stores all Posts.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Posts {
  /**
   * Add a post
   * 
   * @param {number} user_id - id of Pharmacy 
   * @param {string} text 
   * @param {string} tags 
   * @param {boolean} is_item 
   * @return {Post | undefined} - Post
   */
  static async addOne(user_id, username, text, tags, is_item) {
    return db.run(`INSERT INTO posts 
      (
        ${db.columnNames.user_id},
        ${db.columnNames.username},
        ${db.columnNames.text},
        ${db.columnNames.tags},
        ${db.columnNames.is_item},
        ${db.columnNames.timestamp}
      ) 
      VALUES 
      (
        '${user_id}',
        '${username}',
        '${text}',
        '${tags}',
        '${is_item}',
        '${Date.now()}'
      )`)
      .then(() => true)
  }

  /**
   * Return an array of all of the Posts.
   * @return {Post[]}
   */
  static async findAll() {
    return db.all(`SELECT * FROM posts`);
  }

  /**
   * Return an array of all of the posts by the User
   * @return {Post[]}
   */
  static async findByUser(user_id) {
    return db.all(`SELECT * FROM posts WHERE ${db.columnNames.user_id} = '${user_id}'`);
  }
  
}



module.exports = Posts;
