import { providers } from 'ethers';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { connectContractsSigner } from './contracts';

const SIGNATURE_KEY = 'signature';
const SIGNATURE_MESSAGE = 'Start managing your subscriptions with blockchain';

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
  await connectContractsSigner(signer);

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

export const connectWallet = async () => {
  await connecter.activate();
  let signature = localStorage.getItem(SIGNATURE_KEY);
  const provider = await connecter.getProvider();

  if (!signature) {
    const { signer } = await initEthers(provider);
    signature = await signer.signMessage(SIGNATURE_MESSAGE);
    localStorage.setItem(SIGNATURE_KEY, signature);
  }

  const account = await connecter.getAccount();

  if (account && signature) {
    return { account: account, signature: signature };
  }
}