import { Keypair, PublicKey } from "@solana/web3.js";
import secret from "../configs/wallet.json";
import { getReceiverAddress } from "../helpers/environment";

export default class WalletService {
  public static getKeyPair = (): Keypair => {
    const owner: number[] = secret;    
    return Keypair.fromSecretKey(Uint8Array.from(owner));
  };

  public static getReceiverPubKey = (): PublicKey => {
    return new PublicKey(getReceiverAddress());
  };
}
