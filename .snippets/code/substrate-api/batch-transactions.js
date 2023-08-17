import { ApiPromise, WsProvider } from '@polkadot/api';
import Keyring from '@polkadot/keyring';

const main = async () => {
  // Construct API provider
  const wsProvider = new WsProvider('ContainerChain_WSS_ENDPOINT');
  const api = await ApiPromise.create({ provider: wsProvider });

  // Create a keyring instance (ECDSA)
  const keyring = new Keyring({ type: 'ethereum' });

  // Initialize wallet key pairs
  const alice = keyring.addFromUri('ALICE_ACCOUNT_PRIVATE_KEY');

  // Construct a list of transactions to batch
  const txs = [
    api.tx.balances.transfer('BOB_ADDRESS', BigInt(12345)),
    api.tx.balances.transfer('CHARLEY_ADDRESS', BigInt(12345)),
  ];

  // Estimate the fees as RuntimeDispatchInfo, using the signer (either
  // address or locked/unlocked keypair)
  const info = await api.tx.utility.batch(txs).paymentInfo(alice);

  console.log(`Estimated fees: ${info}`);

  // Construct the batch and send the transactions
  api.tx.utility.batch(txs).signAndSend(alice, async ({ status }) => {
    if (status.isInBlock) {
      console.log(`Included in ${status.asInBlock}`);

      // Disconnect the API
      await api.disconnect();
    }
  });
};

main();