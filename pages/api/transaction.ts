import type { NextApiRequest, NextApiResponse } from 'next'
import { myWalletDB } from '@/lib/database';

export type Transaction = {
  hash: string,
  sender:string
}

export type TransactionsResponse = NextApiResponse<{transactions:Transaction[]}|{error:string}>

const request = "INSERT INTO transactions (hash,sender) VALUES(?,?)";

export default async function handler(
  req: NextApiRequest,
  res: TransactionsResponse
) {
  return new Promise<void>((resolve,reject)=>{
    if (req.method === 'POST') {
      const body : Transaction = req.body;
      myWalletDB.run(request,[body.hash,body.sender],(err)=>{
        if ( err ) {
          res.status(500).json({ error: err.message})
          reject();
        }
        res.status(200);
        resolve();
      })
    } else {
      res.status(400).json({error:"Method not allowed"});
      reject();
    }
  })
}
