import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
  interface Transaction {
    hash: string,
    from: string,
    to: string,
    amount: string,
    status: string,
  }
  type TransactionApiResponse ={ transactions: {
    hash: string,
    sender: string
  }[]}
}
