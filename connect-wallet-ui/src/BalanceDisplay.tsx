import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  AccountInfo,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  TransactionBlockhashCtor,
  TransactionInstruction,
} from "@solana/web3.js";
import { useEffect, useState } from "react";
import SendSolForm from "./SendSolForm";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

function BalanceDisplay() {
  const [balance, setBalance] = useState(0);
  const [transactionId, setTransactionId] = useState<string>("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection
      .getAccountInfo(publicKey)
      .then((info: AccountInfo<Buffer> | null) => {
        setBalance(info?.lamports ?? 0);
      });
  }, [connection, publicKey]);

  const sendSol = async (lamports: number, pubKey: PublicKey) => {
    if (!publicKey) {
      return;
    }
    console.log("Sender pub key: ", publicKey.toString());
    console.log("Reciever pub key: ", pubKey.toString());
    console.log("Lamports: ", lamports);

    try {
      const instructions: TransactionInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: pubKey,
        lamports,
      });
      console.log("Instructions: ", instructions);

      const { blockhash } = await connection.getLatestBlockhash();
      console.log("Blockhash: ", blockhash);

      const transaction = new Transaction({
        feePayer: publicKey,
        blockhash,
      } as TransactionBlockhashCtor);
      console.log("Transaction: ", transaction);
      transaction.add(instructions);
      setTransactionId(
        await sendTransaction(transaction, connection, { maxRetries: 5 })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{publicKey ? `Balance: ${balance}` : "Wallet not connected!"}</h1>
      {balance > 0 ? (
        <SendSolForm
          balance={balance}
          onSubmit={({ lamports, receiverPubKey }) => {
            sendSol(lamports, receiverPubKey);
          }}
        />
      ) : null}
      {transactionId ? (
        <a
          href={`https://explorer.solana.com/tx/${transactionId}?cluster=devnet`}
        >
          Last Transaction
        </a>
      ) : null}
    </div>
  );
}

export default BalanceDisplay;
