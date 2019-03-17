const Promise = require('bluebird');

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  // Create links table
  return db.queryAsync(`
      CREATE TABLE IF NOT EXISTS cows (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(40) UNIQUE,
        description VARCHAR(512)
      );`
  )
    .error(err => {
      console.log(err);
    });
};
