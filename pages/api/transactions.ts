// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { myWalletDB } from '@/lib/database';

export type Transaction = {
  hash: string,
  sender:string
}

export type TransactionsResponse = NextApiResponse<{transactions:Transaction[]}|{error:string}>

const request = "SELECT * from transactions WHERE sender = ?";

export default async function handler(
  req: NextApiRequest,
  res: TransactionsResponse
) {
  return new Promise<void>((resolve,reject)=>{
    const { query} = req;
    const { account } = query
    myWalletDB.all(request,[account],(err,rows)=>{
      if ( err ) {
        res.status(500).json({ error: err.message})
        reject();
      } else {
      res.status(200).json({ transactions: rows })
      resolve();
      }
    })
  })

}
