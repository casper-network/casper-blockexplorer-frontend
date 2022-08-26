export type Transfer = {
	deploy_hash: string;
	timestamp: string;
	from_address: string;
	to_address: string;
	value: string;
	fee: string;
	from_balance: string;
	to_balance: string;
	type: string;
};

export type BlockTransfer = {
	deploy_hash: string;
	from: string;
	to: string;
	source: string;
	target: string;
	amount: number;
	gas: string;
	id: any;
};

export type TransferFlow = {
	eraId: number;
	eraStart: string;
	eraEnd: string;
	transfers: {
		id: number;
		timestamp: string;
		depth: number;
		approved: boolean;
		blockHeight: number;
		eraId: number;
		deployHash: string;
		from: string;
		fromHash: string;
		to: string;
		toHash: string;
		amount: string;
		denomAmount: number;
	}[];
	count: number;
};
