const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(
  './app.db',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Conneted to sqlite db')
  }
);

db.serialize(() => {
  db.run(`drop table leads`)
  db.run(`CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY,
    firstname TEXT,
    lastname TEXT,
    email TEXT UNIQUE,
    url TEXT,
    help TEXT,
    resume BLOB,
    visas TEXT,
    status TEXT
  )`, (err) => {
    if (err) return console.error(err.message);
    console.log('create leads table');
    

    db.run(`DELETE FROM leads`, err => {
      if (err) return console.error(err.message);
      console.log('all rows delete from leads');
    });

    const vals1 = [
      'steven',
      'bui',
      'me@mail.com',
      'https://www.linkedin.com/in/sdbui/',
      'help me please',
      '["0-1", "EB-1A"]',
      'pending'
    ];

    const insertSql = `INSERT INTO leads(firstname, lastname, email, url, help, visas, status) VALUES(?,?,?,?,?,?,?)`;
    db.run(insertSql, vals1, function (err) {
      if (err) return console.error(err.message);
      const id = this.lastID; // get id of last inserted row
      console.log(`Rows inserted, ID ${id}`)
    })

    db.close((err) => {
      if (err) return console.error(err.message);
      console.log('closed the db connection')
    });


  })

})