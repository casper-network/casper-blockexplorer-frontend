import {
  JsonDeploySession,
  JsonDeployDelegateSession,
  JsonDeployTransferSession,
  JsonDeployWasmSession,
  JsonDeployNASession,
} from '../missing-sdk-types';

export const isDelegateDeploy = (
  deploySession: JsonDeploySession | any,
): deploySession is JsonDeploySession => {
  const storedContractByHash = (deploySession as JsonDeployDelegateSession)
    .StoredContractByHash;

  if (!storedContractByHash) return false;

  const { entry_point: entryPoint } = storedContractByHash;

  return entryPoint === 'delegate';
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

export const isNADeploy = (
  deploySession: JsonDeploySession | any,
): deploySession is JsonDeploySession => {
  return !!(deploySession as JsonDeployNASession).StoredVersionedContractByName;
};
