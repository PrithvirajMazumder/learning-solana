import { PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import BalanceDisplay from "./BalanceDisplay";

function SendSolForm(props: {
  balance: number;
  onSubmit: (onSubmitParams: {
    lamports: number;
    receiverPubKey: PublicKey;
  }) => void;
}) {
  const { balance, onSubmit } = props;

  return (
    <form
      onSubmit={(event: any) => {
        const { balance, receiverPubKey } = event.target;

        onSubmit({
          lamports: balance.value,
          receiverPubKey: new PublicKey(receiverPubKey.value),
        });
        event.preventDefault();
      }}
    >
      <input
        placeholder="Lamports you want to send"
        name="balance"
        id="balance"
        type="number"
        max={balance}
      />
      <br />
      <input
        name="receiverPubKey"
        id="receiverPubKey"
        placeholder="Receiver public key"
        type="text"
      />
      <br />
      <button type="submit">Send</button>
    </form>
  );
}

export default SendSolForm;
