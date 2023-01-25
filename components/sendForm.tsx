import { useMetamask } from '@/context/metamaskContext';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form'
import Web3 from 'web3'

export default function SendForm ( { onSubmit } : { onSubmit : ()=>void }) {
  const {ethereum, account} = useMetamask();
  const form = useForm({
    initialValues: {
      amout: 0,
      address: "",
    },

    validate: {
      amout: (value) => ( value >= 0 ? null : 'Invalid amout'),
      address: (value) => ( Web3.utils.isAddress(value) ? null : 'Invalid address')
    },
  });

  return (
    <form onSubmit={form.onSubmit(({amout,address}) =>ethereum?.request({
      method: 'eth_sendTransaction',
      params: [{
        to:address,
        from:account,
        value: Web3.utils.toHex(Web3.utils.toWei(amout.toString()))
      }],
    }).then((response)=>{
      fetch('/api/transaction',
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          'sender':account,
          'hash': response
        })
      }).then(()=>onSubmit())
    }))}>
      <Stack>
      <TextInput
        label="Amout"
        withAsterisk
        {...form.getInputProps('amout')}
      />
      <TextInput
        label="Address"
        withAsterisk
        {...form.getInputProps('address')}
      />
      <Group position='center'>
        <Button type="submit" disabled={ethereum === undefined}>
          Send
        </Button>
      </Group>
      </Stack>
    </form>
  )

}
