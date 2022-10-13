import { CLValueParsers } from 'casper-js-sdk';
import {
  JsonDeploySession,
  JsonDeployTransferSession,
  JsonDeployWasmSession,
  JsonDeployEntryPointSession,
} from '../missing-sdk-types';
import { DeployStatus } from '../types';
import {
  isEntryPointDeploy,
  isTransferDeploy,
  isWasmDeploy,
} from './deploy-type-guards';

export const determineDeploySessionData: (
  deploySession: JsonDeploySession,
  deployStatus: DeployStatus,
) => {
  action: string;
  deployType?: string;
  amount?: string;
} = (deploySession, deployStatus) => {
  let sessionMap: Map<unknown, unknown>;
  let action: string = 'N/A';
  let deployType: string | undefined;

  if (isWasmDeploy(deploySession)) {
    action = 'WASM deploy';
    sessionMap = new Map(
      (deploySession as JsonDeployWasmSession).ModuleBytes.args,
    );
  } else if (isTransferDeploy(deploySession)) {
    action = 'Transfer';
    sessionMap = new Map(
      (deploySession as JsonDeployTransferSession).Transfer.args,
    );
  } else if (isEntryPointDeploy(deploySession)) {
    const typedDeploySession = deploySession as JsonDeployEntryPointSession;

    if (!!typedDeploySession.StoredContractByHash) {
      deployType = 'StoredContractByHash';
      action = typedDeploySession.StoredContractByHash.entry_point;
      sessionMap = new Map(typedDeploySession.StoredContractByHash.args);
    } else if (!!typedDeploySession.StoredVersionedContractByName) {
      deployType = 'StoredVersionContractByName';
      action = typedDeploySession.StoredVersionedContractByName.entry_point;
      sessionMap = new Map(
        typedDeploySession.StoredVersionedContractByName.args,
      );
    } else {
      return { action };
    }

    return { deployType, action };
  } else {
    return { action };
  }

  if (deployStatus === DeployStatus.Failed) {
    return { action };
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const amount = CLValueParsers.fromJSON(sessionMap.get('amount'))
    .unwrap()
    .value()
    .toString() as string;

  return { action, deployType, amount };
};
