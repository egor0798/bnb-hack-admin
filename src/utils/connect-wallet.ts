import { providers } from 'ethers';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const SIGNATURE_KEY = 'signature';
const SIGNATURE_MESSAGE = 'SIGNATURE_MESSAGE';

// export async function connectContractsSigner(signer: providers.JsonRpcSigner) {
//   for (const x of Object.keys(contracts)) {
//     try {
//       const key = x as keyof typeof contracts;
//       contracts[key] = contracts[key].connect(signer);
//     } catch (error) {
//       console.error(`Contract ${x} signer provider error. `, error);
//     }
//   }
// }


const chainId = 97;

const connecter = new WalletConnectConnector({
  infuraId: undefined,
  qrcode: true,
  supportedChainIds: [chainId],
  rpc: {
    [chainId]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  },
  chainId: chainId,
});

const initEthers = async (provider: providers.ExternalProvider | providers.JsonRpcFetchFunc) => {
  const ethersProvider = new providers.Web3Provider(provider);
  const signer = ethersProvider.getSigner();
  // await connectContractsSigner(signer);

  return { ethersProvider, signer };
};

export const login = async () => {
  try {
    await connecter.activate();

    const account = await connecter.getAccount();
    const provider = await connecter.getProvider();
    const { signer } = await initEthers(provider);
    const signature = await signer.signMessage(SIGNATURE_MESSAGE);
    localStorage.setItem(SIGNATURE_KEY, signature);

    return { account: String(account), signature: signature };
  } catch (e) {
    console.log(e);
  }
};

export const logout = async () => {
  connecter.deactivate();
};

export const getAccount = async () => {
  try {
    const acc = await connecter.getAccount();
    return acc;
  } catch (e) {
    return null;
  }
}


export const connectWallet = async () => {
  const signature = localStorage.getItem(SIGNATURE_KEY);
  if (!signature) {
    return ;
  }
  await connecter.activate();
  const account = await connecter.getAccount();

  if (account && signature) {
    const provider = await connecter.getProvider();
    await initEthers(provider);

    return { account: account, signature: signature };
  }
}