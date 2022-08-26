export type Delegation = {
	total: number;
	data: DelegationData[];
};
export type DelegationData = {
	hash: string;
	unbonder_public_key: string;
	validator_public_key: string;
	amount: string;
	status: boolean;
	timestamp: number;
	validator_name: string;
	validator_icon: string;
};

export type Undelegation = {
	delegator: string;
	validator: string;
	amount: string;
	timestamp: string;
	release_timestamp: number;
	status: boolean;
};
