import { CLValueParsers } from 'casper-js-sdk';
import {
  JsonDeploySession,
  JsonDeployDelegateSession,
  JsonDeployTransferSession,
  JsonDeployUnknownSession,
  JsonDeployWasmSession,
  JsonDeployNASession,
} from '../missing-sdk-types';
import { DeployStatus } from '../types';
import {
  isDelegateDeploy,
  isNADeploy,
  isTransferDeploy,
  isWasmDeploy,
} from './deploy-type-guards';

export const determineDeploySessionData: (
  deploySession: JsonDeploySession,
  deployStatus: DeployStatus,
) => {
  deployType: string;
  amount?: string;
} = (deploySession, deployStatus) => {
  let sessionMap: Map<unknown, unknown>;
  let deployType: string;

  if (isWasmDeploy(deploySession)) {
    deployType = 'WASM deploy';
    sessionMap = new Map(
      (deploySession as JsonDeployWasmSession).ModuleBytes.args,
    );
  } else if (isTransferDeploy(deploySession)) {
    deployType = 'Transfer';
    sessionMap = new Map(
      (deploySession as JsonDeployTransferSession).Transfer.args,
    );
  } else if (isDelegateDeploy(deploySession)) {
    deployType = 'Delegate';
    sessionMap = new Map(
      (deploySession as JsonDeployDelegateSession).StoredContractByHash.args,
    );
  } else if (isNADeploy(deploySession)) {
    deployType = 'N/A';
    sessionMap = new Map(
      (deploySession as JsonDeployNASession).StoredVersionedContractByName.args,
    );
  } else {
    deployType = (deploySession as JsonDeployUnknownSession)
      .StoredContractByHash.entry_point;
    return { deployType };
  }

  if (deployStatus === DeployStatus.Failed) {
    return { deployType };
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const amount = CLValueParsers.fromJSON(sessionMap.get('amount'))
    .unwrap()
    .value()
    .toString() as string;

  return { deployType, amount };
};
