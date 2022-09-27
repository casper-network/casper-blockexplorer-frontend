import { JsonBlock, GetStatusResult } from 'casper-js-sdk';

export interface JsonDeployPayment {
  ModuleBytes: {
    args: any[];
    module_bytes: string;
  };
}

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


