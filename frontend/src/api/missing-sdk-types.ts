import { JsonBlock, GetStatusResult } from 'casper-js-sdk';

export interface JsonDeployPayment {
  ModuleBytes: {
    args: any[];
    module_bytes: string;
  };
}

interface EntryPointSession {
  args: any[];
  hash: string;
  entry_point: string;
}
export interface JsonDeployEntryPointSession {
  StoredContractByHash?: EntryPointSession;
  StoredVersionedContractByName?: EntryPointSession;
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
  | JsonDeployEntryPointSession;

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
