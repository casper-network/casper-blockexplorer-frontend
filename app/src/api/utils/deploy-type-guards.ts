import {
  JsonDeployEntryPointSession,
  JsonDeploySession,
  JsonDeployTransferSession,
  JsonDeployWasmSession,
} from '../missing-sdk-types';

export const isEntryPointDeploy = (
  deploySession: JsonDeploySession | any,
): deploySession is JsonDeploySession => {
  const storedContractByHash = (deploySession as JsonDeployEntryPointSession)
    .StoredContractByHash;

  const storedVersionedContractByName = (
    deploySession as JsonDeployEntryPointSession
  ).StoredVersionedContractByName;

  return !!storedContractByHash || !!storedVersionedContractByName;
};

export const isTransferDeploy = (
  deploySession: JsonDeploySession | any,
): deploySession is JsonDeploySession => {
  return !!(deploySession as JsonDeployTransferSession).Transfer;
};

export const isWasmDeploy = (
  deploySession: JsonDeploySession | any,
): deploySession is JsonDeploySession => {
  return !!(deploySession as JsonDeployWasmSession).ModuleBytes;
};
