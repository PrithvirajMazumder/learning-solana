import dotenv from "dotenv";
dotenv.config();

export const getReceiverAddress = (): string =>
  process.env.RECEIVER_ADDRESS ?? "";

export const getAmmountToTransfer = (): number =>
  parseInt(process.env.AMOUNT_TO_TRANSFER ?? "0");
