import { browser } from '$app/env';
import { bidStore, lastBidUpdateTime, rpcUrl } from '$stores/chain';
import { parseStringValue } from '$utils/converters';
import type { Bid, EraValidator } from '$utils/types/validator';
import { get } from 'svelte/store';
export const queryValidators = async (): Promise<{
	_bidValidators: Bid[];
	_currentEraValidators: EraValidator[];
	_nextEraValidators: EraValidator[];
	_eraIDs: number[];
}> => {
	// @ts-ignore
	const { CasperServiceByJsonRPC } = browser && window.CasperSDK;
	// console.log(CasperServiceByJsonRPC);
	const casperService = new CasperServiceByJsonRPC(get(rpcUrl));
	return await casperService
		.getValidatorsInfo()
		.then((validatorsInfoResult) => {
			const { bids } = validatorsInfoResult.auction_state;
			const eraValidatorsInfo = validatorsInfoResult.auction_state.era_validators;
			let totalStakes: number[] = [0, 0];
			eraValidatorsInfo.forEach((eraValidatorInfo, i) => {
				eraValidatorInfo.validator_weights.forEach((validatorWeight) => {
					totalStakes[i] += parseStringValue(validatorWeight.weight);
				});
			});

			let bidValidators: Bid[] = [];
			let currentEraValidators: EraValidator[] = [];
			let nextEraValidators: EraValidator[] = [];
			let eraIDs: number[] = [];
			bids &&
				bids.forEach((bid) => {
					const selfStake = parseStringValue(bid.bid.staked_amount);
					let totalDelegated = 0;
					let delegators: {
						publicKey: string;
						stakedAmount: number;
						bondingPurse: string;
						delegatee: string;
					}[] = [];

					bid?.bid?.delegators?.forEach((delegator) => {
						delegators.push({
							publicKey: delegator.public_key,
							stakedAmount: parseStringValue(delegator.staked_amount),
							bondingPurse: delegator.bonding_purse,
							delegatee: delegator.delegatee
						});
						totalDelegated += parseStringValue(delegator.staked_amount);
					});
					let totalBid = selfStake + totalDelegated;
					const selfStakePercentage = (selfStake / totalBid) * 100;

					bidValidators.push({
						publicKey: bid.public_key,
						numOfDelegators: bid?.bid?.delegators?.length,
						delegationRate: bid.bid?.delegation_rate,
						totalBid,
						totalDelegated,
						selfStake,
						delegators,
						selfStakePercentage,
						networkPercentage: 0,
						inactive: bid.bid.inactive
					});
				});

			bidValidators &&
				bidValidators.forEach((bidValidator) => {
					eraValidatorsInfo.forEach((eraValidatorInfo, i) => {
						eraIDs.push(eraValidatorInfo.era_id);
						eraValidatorInfo.validator_weights.forEach((validatorWeight) => {
							if (bidValidator.publicKey === validatorWeight.public_key) {
								const selfStake = parseStringValue(validatorWeight.weight);
								let networkPercentage = (selfStake / totalStakes[i]) * 100;

								if (i === 0) {
									currentEraValidators.push({
										publicKey: validatorWeight.public_key,
										selfStake,
										delegationRate: bidValidator.delegationRate,
										numOfDelegators: bidValidator.numOfDelegators,
										totalStake: totalStakes[i],
										selfStakePercentage: bidValidator.selfStakePercentage,
										networkPercentage
									});
									bidValidator.networkPercentage = networkPercentage;
								} else {
									nextEraValidators.push({
										publicKey: validatorWeight.public_key,
										selfStake,
										delegationRate: bidValidator.delegationRate,
										numOfDelegators: bidValidator.numOfDelegators,
										totalStake: totalStakes[i],
										selfStakePercentage: bidValidator.selfStakePercentage,
										networkPercentage
									});
								}
							}
						});
					});
				});

			// Rank by total stake
			const _bidValidators = bidValidators.sort((a, b) => b.totalBid - a.totalBid);
			_bidValidators &&
				_bidValidators.forEach((bid, i) => {
					bid.rank = i + 1;
				});

			const _currentEraValidators = currentEraValidators.sort((a, b) => b.selfStake - a.selfStake);
			_currentEraValidators &&
				_currentEraValidators.forEach((bid, i) => {
					bid.rank = i + 1;
				});

			const _nextEraValidators = nextEraValidators.sort((a, b) => b.selfStake - a.selfStake);
			_nextEraValidators &&
				_nextEraValidators.forEach((bid, i) => {
					bid.rank = i + 1;
				});

			// TODO Clean up for bid persistence
			// Update bidStore only if new validators are different
			if (get(bidStore) !== _bidValidators) {
				bidStore.set(_bidValidators);
			}
			lastBidUpdateTime.set(Date.now());
			return {
				_bidValidators,
				_currentEraValidators,
				_nextEraValidators,
				_eraIDs: eraIDs
			};
		})
		.catch((err) => {
			console.log('Validators Err', err);
		});
};

export const getTopValidators = async (
	numberOfValidators: number
): Promise<Partial<EraValidator>[]> => {
	let { _bidValidators, _currentEraValidators } = await queryValidators();
	let topValidators: Partial<EraValidator>[];

	if (_currentEraValidators) {
		_currentEraValidators.forEach((validator) => {
			const bid = _bidValidators.find(
				(bidValidator) => bidValidator.publicKey === validator.publicKey
			);
			validator.totalBid = bid && bid.totalBid;
		});
		const currentEraValidators = _currentEraValidators.sort((a, b) => b.totalBid - a.totalBid);
		topValidators = currentEraValidators.slice(0, numberOfValidators);
	}
	return topValidators ?? null;
};
export const getValidatorDetails = async (publicKey: string): Promise<Bid> => {
	const { _bidValidators } = await queryValidators();
	const validator = _bidValidators.find((bid) => bid.publicKey == publicKey);
	return validator;
};

export const pollValidatorData = () => {
	const bids = get(bidStore);
	const timePassed = (Date.now() - get(lastBidUpdateTime)) / (1000 * 60); // time since last refresh in minutes
	const interval = 5; //time in minutes to refresh the validators
	if (!bids || timePassed >= interval) {
		setTimeout(async () => {
			await queryValidators();
		}, 1);
	}
};
