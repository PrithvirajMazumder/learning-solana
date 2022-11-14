import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  MessageV0,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  TransactionMessage,
  TransferParams,
  VersionedTransaction,
} from "@solana/web3.js";
import { getLatestBlockhash } from "../helpers/blockhas";
import { getAmmountToTransfer } from "../helpers/environment";
import { createSolanaExplorerViewLink } from "../helpers/url";
import WalletService from "../services/wallet.service";

const OWNER_KEYPAIR = WalletService.getKeyPair();

//just to view public key and secret key
(() => {
  const { publicKey, secretKey } = OWNER_KEYPAIR;
  console.log(`Public key: ${publicKey} \n Secret Key: ${secretKey}`);
})();

const connection: Connection = new Connection(clusterApiUrl("devnet"));

const transferSol = async (
  sender: Keypair,
  receiver: PublicKey,
  amount: number
): Promise<string> => {
  const instructions: TransactionInstruction[] = [
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: receiver,
      lamports: LAMPORTS_PER_SOL * amount,
    } as TransferParams),
  ];
  //Instruction created

  const { blockhash } = await getLatestBlockhash(connection);
  console.log(`Blockhash: ${blockhash}`);

  const message: MessageV0 = new TransactionMessage({
    instructions,
    recentBlockhash: blockhash,
    payerKey: sender.publicKey,
  }).compileToV0Message();
  //Message created

  const transaction = new VersionedTransaction(message);
  transaction.sign([sender]);

  return await connection.sendTransaction(transaction);
};

(async () => {
  try {
    const receiver: PublicKey = WalletService.getReceiverPubKey();
    const AMOUNT: number = getAmmountToTransfer();
    console.log(`\nSender public key: ${OWNER_KEYPAIR.publicKey.toString()}`);
    console.log(`\nReceiver public key: ${receiver.toString()}`);
    console.log("\n------------------ Transfer started ------------------");
    const transactionId: string = await transferSol(
      OWNER_KEYPAIR,
      receiver,
      AMOUNT
    );
    console.info(createSolanaExplorerViewLink(transactionId));
  } catch (error) {
    console.error(error);
  }
})();
