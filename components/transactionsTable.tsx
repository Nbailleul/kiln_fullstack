import { Table } from "@mantine/core";
import Web3 from 'web3'

function short_hash( hash : string) {
  return `${hash.slice(0,4)}..${hash.slice(hash.length-4)}`
}

export default function TransactionsTable ( {transactions } : { transactions :Transaction[]}  ) {
  return (
    <>
      {transactions !== undefined && (
        <Table >
          <thead>
          <tr>
            <th>Hash</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.hash}>
              <td>{short_hash(transaction.hash) }</td>
              <td>{short_hash(transaction.from)}</td>
              <td>{short_hash(transaction.to)}</td>
              <td>{Web3.utils.fromWei(transaction.amount)}</td>
              <td>{transaction.status} </td>
            </tr>
          ))}
        </tbody>
        </Table>
      )}
    </>
  )
}
