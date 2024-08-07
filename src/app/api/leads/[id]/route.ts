import { NextResponse, NextRequest } from 'next/server';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db = null;

export async function PUT(req: NextRequest, context, res: NextResponse) {
  if (!db) {
    db = await open({
      filename: './app.db',
      driver: sqlite3.Database
    })
  }

  let id = context.params.id;
  const vals = ['reached out', id];
  const sql = `UPDATE leads
    SET status = ?
    WHERE id=?
  `;

  db.run(sql, vals, function (err: Error) {
    if (err) return console.error(err.message);
    console.log('updated success')
  })

  return NextResponse.json({message: 'hi'})
}