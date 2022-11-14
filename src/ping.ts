import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  getProgramAddress,
  getProgramDataAddress,
} from "../helpers/environment";
import { createSolanaExplorerViewLink } from "../helpers/url";
import WalletService from "../services/wallet.service";

//driver code
const main = async () => {
  const payer = WalletService.getKeyPair();
  const connection = new Connection(clusterApiUrl("devnet"));
  console.log("Transaction started!!!!!");
  try {
    const transactionId = await pingProgram({
      connection,
      payer,
    });
    console.log(createSolanaExplorerViewLink(transactionId));
  } catch (error) {
    console.error(`Transaction failed: ${error}`);
  } finally {
    console.log("Transaction finished!!!");
  }
};

const pingProgram = async (params: {
  connection: Connection;
  payer: Keypair;
}) => {
  const { connection, payer } = params;
  console.log("payer: ", payer);
  
  const transaction: Transaction = new Transaction();
  const programAddress: PublicKey = getProgramAddress();
  console.log("programAddress: ", programAddress);
  const programDataAddress: PublicKey = getProgramDataAddress();
  console.log("programDataAddress: ", programDataAddress);
  const instruction: TransactionInstruction = new TransactionInstruction({
    keys: [
      {
        pubkey: programDataAddress,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId: programAddress,
  });

  transaction.add(instruction);

  return await sendAndConfirmTransaction(connection, transaction, [payer]);
};

main();
