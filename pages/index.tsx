import SendForm from "@/components/sendForm";
import TransactionsTable from "@/components/transactionsTable";
import { useMetamask } from "@/context/metamaskContext"
import { Container,Button, Flex, Divider, Stack, Table } from "@mantine/core";
import { useEffect, useState} from 'react';
import Web3 from 'web3'

export default function Home() {
  const {eth, account} = useMetamask();
  const [balance,setBalance] = useState<string|undefined>(undefined)
  const [transactions,setTransactions] =  useState<Transaction[]>([])

  async function fetchTransactions () {
    if ( eth && account) {
      fetch(`/api/transactions?account=${account}`)
      .then((res) => res.json())
      .then((data : TransactionApiResponse) => Promise.all(
        data.transactions.map((transactionRaw)=>{
          return new Promise<Transaction>((resolve,reject)=>{
            eth.getTransaction(transactionRaw.hash).then((transactionReturn)=>{
              let transaction = {
                hash: transactionReturn.hash,
                from: transactionReturn.from,
                to: transactionReturn.to ? transactionReturn.to : 'unknown',
                amount: transactionReturn.value,
                status: 'Pending'
              }
              if ( transactionReturn.blockHash ) {
                eth.getTransactionReceipt(transactionReturn.hash).then((transactionReceipt)=>{
                transaction.status = transactionReceipt.status ? 'OK' : 'KO'
                resolve(transaction)
                })
              } else { resolve(transaction)}
            })
          })
      })
      ))
      .then((transactionsCompleted)=>setTransactions(transactionsCompleted))
    } else { setTransactions([])}
  }
  useEffect(()=>{
    if ( eth && account) {
      eth.getBalance(account).then((response)=>setBalance(response))
      fetchTransactions()
    }
  },[eth,account])

  useEffect(()=>{
    const fetcher = setInterval(()=> fetchTransactions(), 1000)
    return function cleanup () {clearInterval(fetcher)}
  })


  return (
    <>
      {account && eth && (
        <>
          <Stack>
            <Table striped withBorder>
              <tbody>
                <tr key="account">
                  <td>account</td>
                  <td>{window.ethereum.selectedAddress}</td>
                </tr>
                <tr key="balance">
                  <td>balance (ETH)</td>
                  <td>{balance ? Web3.utils.fromWei(balance): "NaN"}</td>
                </tr>
              </tbody>
            </Table>
            <Divider my="lg" />
            <SendForm onSubmit={fetchTransactions}/>
            <Divider/>
            <TransactionsTable transactions={transactions}/>
          </Stack>
        </>
      )}
    </>
  )
}
