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
    email TEXT,
    url TEXT,
    help TEXT,
    resume BLOB,
    visas JSON
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
      'linkedin.com',
      'help me please'
    ];

    const insertSql = `INSERT INTO leads(firstname, lastname, email, url, help) VALUES(?, ?, ?, ?, ?)`;
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

// db.serialize(() => {
//   // Create the items table if it doesn't exist
//   db.run(
//     `CREATE TABLE IF NOT EXISTS leads (
//         id INTEGER PRIMARY KEY,
//         firstname TEXT,
//         lastname TEXT,
//         email TEXT,
//         url TEXT,
//       )`,
//     (err) => {
//       if (err) {
//         return console.error(err.message);
//       }
//       console.log("Created leads table.");

//       // // Clear the existing data in the products table
//       // db.run(`DELETE FROM items`, (err) => {
//       //   if (err) {
//       //     return console.error(err.message);
//       //   }
//       //   console.log("All rows deleted from items");

//       //   // Insert new data into the products table
//       //   const values1 = [
//       //     "Oshawott",
//       //     "Basic Pokemon. HP 60. Surprise Attack 20. Flip a coin. If heads, this attack does 10 more damage. Water Gun 30. Weakness: Lightning x2. Resistance: none. Retreat Cost: 1.",
//       //     "/collection/item1.png",
//       //   ];
//       //   const values2 = [
//       //     "Riolu",
//       //     "Basic Pokemon. HP 60. Quick Attack 10. Flip a coin. If heads, this attack does 10 more damage. Weakness: Fighting x2. Resistance: none. Retreat Cost: 1.",
//       //     "/collection/item2.png",
//       //   ];

//       //   const values3 = [
//       //     "Snivy",
//       //     "Basic Pokemon. HP 60. Slam 20. Weakness: Fire x2. Resistance: Water -20. Retreat Cost: 1.",
//       //     "/collection/item3.png",
//       //   ];

//       //   const values4 = [
//       //     "Zorua",
//       //     "Basic Pokemon. HP 60. Stampede 10. Ram 20. Weakness: Fighting x2, Resistance: Psychic -20. Retreat Cost: 1.",
//       //     "/collection/item4.png",
//       //   ];

//       //   const insertSql = `INSERT INTO items(name, description, img) VALUES(?, ?, ?)`;

//       //   db.run(insertSql, values1, function (err) {
//       //     if (err) {
//       //       return console.error(err.message);
//       //     }
//       //     const id = this.lastID; // get the id of the last inserted row
//       //     console.log(`Rows inserted, ID ${id}`);
//       //   });

//       //   db.run(insertSql, values2, function (err) {
//       //     if (err) {
//       //       return console.error(err.message);
//       //     }
//       //     const id = this.lastID; // get the id of the last inserted row
//       //     console.log(`Rows inserted, ID ${id}`);
//       //   });

//       //   db.run(insertSql, values3, function (err) {
//       //     if (err) {
//       //       return console.error(err.message);
//       //     }
//       //     const id = this.lastID; // get the id of the last inserted row
//       //     console.log(`Rows inserted, ID ${id}`);
//       //   });

//       //   db.run(insertSql, values4, function (err) {
//       //     if (err) {
//       //       return console.error(err.message);
//       //     }
//       //     const id = this.lastID; // get the id of the last inserted row
//       //     console.log(`Rows inserted, ID ${id}`);
//       //   });

//       //   //   Close the database connection after all insertions are done
//       //   db.close((err) => {
//       //     if (err) {
//       //       return console.error(err.message);
//       //     }
//       //     console.log("Closed the database connection.");
//       //   });
//       // });
//     }
//   );
// });