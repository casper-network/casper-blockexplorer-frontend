// export type Block = {
// 	body: {
// 		proposer: string;
// 		deploy_hashes: string[];
// 		transfer_hashes: string[];
// 	};
// 	hash: string;
// 	header: {
// 		accumulated_seed: string;
// 		body_hash: string;
// 		era_end: any;
// 		era_id: number;
// 		height: number;
// 		parent_hash: string;
// 		protocol_version: string;
// 		random_bit: boolean;
// 		state_root_hash: string;
// 		timestamp: string;
// 	};
// 	proofs: {
// 		public_key: string;
// 		signature: string;
// 	}[];
// };

export type Block = {
	height: number;
	eraID: number;
	transactions: number;
	timestamp: number;
	hash: string;
	validatorPublicKey: string;
	stateRootHash?: string;
	proofs?: any[];
};

export type ProposerBlocks = {
	hash: string;
	height: number;
	timestamp: string;
	era: number;
	deploys: number;
	transfers: number;
};

// export type RangeBlock = {
// 	current_height: number;
// 	result: Block[];
// };

export type BlockDetail = {
	jsonrpc: string;
	id: number;
	result: {
		api_version: string;
		block: Block;
		current_height: number;
	};
};
