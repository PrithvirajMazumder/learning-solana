import { PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

export const getReceiverAddress = (): string =>
  process.env.RECEIVER_ADDRESS ?? "";

export const getAmmountToTransfer = (): number =>
  parseInt(process.env.AMOUNT_TO_TRANSFER ?? "0");

export const getProgramAddress = (): PublicKey =>
  new PublicKey(process.env.PROGRAM_ADDRESS ?? "");

export const getProgramDataAddress = (): PublicKey =>
  new PublicKey(process.env.PROGRAM_DATA_ADDRESS ?? "");
