import { Contract, providers } from 'ethers';
import * as abi from '../abi';

export const coreContract = new Contract('0x867851437A9dfB0422463b2e11714656cF9e61Bc', abi.core);

export async function connectContractsSigner(signer: providers.JsonRpcSigner) {
  coreContract.connect(signer);
}
