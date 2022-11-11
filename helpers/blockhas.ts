import { Connection } from "@solana/web3.js";

export const getLatestBlockhash = async (
  connection: Connection
): Promise<
  Readonly<{
    blockhash: string;
    lastValidBlockHeight: number;
  }>
> => await connection.getLatestBlockhash();
