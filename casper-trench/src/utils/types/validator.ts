export type Validator = {
	APY: number;
	block_height: number;
	circulating_supply: string;
	era_validators: {
		era_id: number;
		validators: [
			{
				public_key: string;
				bid: {
					delegation_rate: number;
					delegators: number;
					staked_amount: string;
					total_stake: string;
				};
				information: {
					details: string;
					email: string;
					icon: string;
					links: [
						{
							tag: string;
							link: string;
						}
					];
					name: string;
					website: string;
				};
			}
		];
	};
	total_active_validators: number;
	total_bid_validators: number;
	total_stake: string;
	total_supply: string;
};
export type EraValidator = {
	publicKey: string;
	selfStake: number;
	delegationRate: number;
	numOfDelegators: number;
	totalStake: number;
	selfStakePercentage: number;
	networkPercentage: number;
	totalBid?: number;
	rank?: number;
	icon?: string;
	name?: string;
};
export type Bid = {
	publicKey: string;
	numOfDelegators: number;
	delegationRate: number;
	totalBid: number;
	totalDelegated: number;
	selfStake: number;
	selfStakePercentage: number;
	delegators: {
		publicKey: string;
		stakedAmount: number;
		bondingPurse: string;
		delegatee: string;
	}[];
	inactive: boolean;
	networkPercentage?: number;
	rank?: number;
	icon?: string;
	name?: string;
	email?: string;
	website?: string;
	links?: {
		tag: string;
		link: string;
	}[];
	details?: string;
};

export type ValidatorDetails = {
	public_key: string;
	bid: {
		bonding_purse: string;
		staked_amount: string;
		delegation_rate: number;
		delegators: {
			public_key: string;
			staked_amount: number;
			bonding_purse: string;
			delegatee: string;
		}[];
		inactive: boolean;
		total_stake: string;
	};
	information: {
		name: string;
		email: string;
		icon: string;
		website: string;
		links: {
			tag: string;
			link: string;
		}[];
		details: string;
	};
};
