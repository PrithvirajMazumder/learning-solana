import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useEffect } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import BalanceDisplay from "./BalanceDisplay";

function App() {
  const endpoint: string = clusterApiUrl("devnet");
  const wallet: PhantomWalletAdapter = new PhantomWalletAdapter();
  useEffect(() => {
    wallet.connect();
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[wallet]}>
        <WalletModalProvider>
          <WalletMultiButton />
          <BalanceDisplay />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
