export type TopAccount = {
	publicKey: string;
	accountHash: string;
	balance: number;
	activeDate: string;
	transferrable: number;
	stakedAmount: number;
	txnCount: number;
	rank?: number;
};

export type Account = {
	account_hash: string;
	public_key_hex: string;
	balance: string;
	active_date: string;
	name: string;
	transferrable: string;
	total_staked: string;
	total_reward: string;
	unbonding: string;
};
