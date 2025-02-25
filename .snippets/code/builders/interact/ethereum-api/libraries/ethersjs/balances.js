// Import ethers
import { ethers } from 'ethers';

// Define network configurations
const providerRPC = {
  EvmContainer: {
    name: 'dancebox-evm-container',
    rpc: 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network', // Insert your RPC URL here
    chainId: 5678, // 0x162E in hex,
  },
};
// Create ethers provider
const provider = new ethers.JsonRpcProvider(providerRPC.EvmContainer.rpc, {
  chainId: providerRPC.EvmContainer.chainId,
  name: providerRPC.EvmContainer.name,
});

// Define addresses
const addressFrom = 'INSERT_ADDRESS_FROM';
const addressTo = 'INSERT_ADDRESS_TO';

// Create balances function
const balances = async () => {
  // Fetch balances
  const balanceFrom = ethers.formatEther(
    await provider.getBalance(addressFrom)
  );
  const balanceTo = ethers.formatEther(await provider.getBalance(addressTo));

  console.log(`The balance of ${addressFrom} is: ${balanceFrom} TANGO`);
  console.log(`The balance of ${addressTo} is: ${balanceTo} TANGO`);
};

// Call the balances function
balances();
