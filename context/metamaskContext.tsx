import { createContext, useState, useContext, type PropsWithChildren, useEffect } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { provider} from 'web3-core';
import Web3 from 'web3';
import { Eth } from 'web3-eth';

type accountsType =(string|undefined)[] | undefined | null

const MetaMaskContext = createContext<{
  account : string | undefined;
  eth : Eth | undefined;
  connectWallet:()=>Promise<void>;
  ethereum: MetaMaskInpageProvider | undefined
}|undefined>(undefined);

const ethereum = (typeof window !=='undefined') ? window.ethereum : undefined;

export const MetaMaskProvider = ({ children } : PropsWithChildren) => {
  const [account, setAccount] = useState<string|undefined>(undefined);
  const [eth,setEth] = useState<Eth|undefined>(undefined)

  function setFirstAccount( accounts : unknown) {
    const accountTyped= accounts as accountsType
    if ( accountTyped && accountTyped.length && accountTyped[0]) {
    setAccount(accountTyped[0]);}
    else { setAccount(undefined)}
  }

  const connectWallet = async () => {
    if (ethereum) {
      try {
        setEth(new Web3(ethereum as provider).eth)
        const accounts : accountsType  = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setFirstAccount(accounts)
      } catch (err : any) {
        throw err.message;
      }
    } else {
      throw "Metamask extension not found"
    }
  };
  useEffect(()=>{
    if(ethereum) {
      ethereum.on('accountsChanged',setFirstAccount)
      connectWallet();
    }
    return function cleanup () {
      if ( ethereum)
        ethereum.removeListener('accountsChanged',setFirstAccount)
    }
  },[])

  return (
    <MetaMaskContext.Provider value={{ account, eth, connectWallet , ethereum }}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export function useMetamask() {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error("useMetamask must be used within a MetamaskProvider");
  }
  return context;
}
