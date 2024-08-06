import { NextResponse, NextRequest } from 'next/server';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db = null;
// get all leads
export async function GET(req, res) {
  if (!db) {
    db = await open({
      filename: './app.db',
      driver: sqlite3.Database
    })
  }

  const leads = await db.all('select * from leads');
  return NextResponse.json(leads);
}

export async function POST(req: NextRequest,res: NextResponse) {
  const body = await req.json();
  const {
    firstName,
    lastName,
    email,
    url,
    help,
    // visa, // can probably just store stringified array
    // resume // may run into issues with the file upload???
  } = body;
  let vals = [firstName, lastName, email, url, help]

  // save to sqlite db???
  if (!db) {
    db = await open({
      filename: './app.db',
      driver: sqlite3.Database
    })
  }

  let sql = `INSERT INTO leads(firstname, lastname, email, url, help) VALUES(?,?,?,?,?)`
  db.run(sql, vals, function (err: Error) {
    if (err) return console.error(err.message);
    console.log('insert successful');
  })

  return NextResponse.json({message: 'posted!'})
}