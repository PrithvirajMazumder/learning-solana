export const createSolanaExplorerViewLink = (transactionId: string): string =>
  `You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${transactionId}?cluster=devnet`;
