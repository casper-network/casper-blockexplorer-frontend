import { JsonBlock, GetStatusResult } from 'casper-js-sdk';

export interface JsonDeployPayment {
  ModuleBytes: {
    args: any[];
    module_bytes: string;
  };
}

export interface JsonDeployDelegateSession {
  StoredContractByHash: {
    args: any[];
    hash: string;
    entry_point: string;
  };
}

export interface JsonDeployUnknownSession {
  StoredContractByHash: {
    args: any[];
    hash: string;
    entry_point: string;
  };
}

export interface JsonDeployNASession {
  StoredVersionedContractByName: {
    args: any[];
    hash: string;
    entry_point: string;
  };
}
export interface JsonDeployTransferSession {
  Transfer: {
    args: any[];
  };
}

export interface JsonDeployWasmSession {
  ModuleBytes: {
    args: any[];
    module_bytes: string;
  };
}

export type JsonDeploySession =
  | JsonDeployTransferSession
  | JsonDeployWasmSession
  | JsonDeployDelegateSession;

export interface JsonBlockWithBody extends JsonBlock {
  body: {
    proposer: string;
    deploy_hashes?: string[];
    transfer_hashes?: string[];
  };
}

export interface GetStatusResultExtended extends GetStatusResult {
  chainspec_name: string;
}
