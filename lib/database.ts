import sqlite from 'sqlite3'

export const myWalletDB = new sqlite.Database('./db/myWallet.db')

myWalletDB.run(`CREATE TABLE IF NOT EXISTS transactions (
  hash TEXT PRIMARY KEY,
  sender TEXT NOT NULL
);`)
