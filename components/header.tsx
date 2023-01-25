import { useMetamask } from "@/context/metamaskContext";
import { Button, Flex } from "@mantine/core";

export default function Header () {
  const { account, connectWallet } = useMetamask();
  return (
    <Flex direction="row" align="center" gap="lg" justify="space-between">
      <div>
        <h2>Wallet</h2>
      </div>
      <div>
        {account ? "Connected" : "Connect to metamask"}
      </div>
      <div>
        <Button
          onClick={connectWallet}
        >
          {account? "Reconnect" : "Connect"}
        </Button>
      </div>
    </Flex>
  )
}
