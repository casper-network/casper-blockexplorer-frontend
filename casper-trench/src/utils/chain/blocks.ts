import { rpcUrl } from '$stores/chain';
import { parseStringValue } from '$utils/converters';
import type { Block } from '$utils/types/block';
import type { BlockTransfer } from '$utils/types/transfer';
// import { CasperServiceByJsonRPC, type GetBlockResult } from 'casper-js-sdk';
import { get } from 'svelte/store';
import { browser } from '$app/env';

export const getLatestBlocks = async (numberOfBlocks?: number): Promise<Block[]> => {
	// @ts-ignore
	const { CasperServiceByJsonRPC } = browser && window.CasperSDK;
	const casperService = new CasperServiceByJsonRPC(get(rpcUrl));
	let blocks: Block[] = [];
	const currentHeight = await getCurrentBlockHeight();
	const num = numberOfBlocks ?? currentHeight;
	for (let i = currentHeight; i > currentHeight - num; i--) {
		await casperService
			.getBlockInfoByHeight(i)
			.then((getBlockResult) => {
				const { block } = getBlockResult;
				blocks.push({
					height: block.header.height,
					eraID: block.header.era_id,
					transactions: block.body.deploy_hashes.length ?? 0,
					timestamp: Date.parse(block.header.timestamp.toString()),
					hash: block.hash,
					validatorPublicKey: block.body.proposer
				});
			})
			.catch((err) => {
				console.log('Block By Height Error: ', err);
			});
	}
	return blocks;
};

export const getBlocks = async (startHeight: number, endHeight: number): Promise<Block[]> => {
	// @ts-ignore
	const { CasperServiceByJsonRPC } = browser && window.CasperSDK;
	const casperService = new CasperServiceByJsonRPC(get(rpcUrl));
	let blocks: Block[] = [];
	for (let i = endHeight; i >= startHeight; i--) {
		await casperService
			.getBlockInfoByHeight(i)
			.then((getBlockResult) => {
				const { block } = getBlockResult;
				blocks.push({
					height: block.header.height,
					eraID: block.header.era_id,
					transactions: block.body.deploy_hashes.length ?? 0,
					timestamp: Date.parse(block.header.timestamp.toString()),
					hash: block.hash,
					validatorPublicKey: block.body.proposer,
					stateRootHash: block.header.state_root_hash,
					proofs: block.proofs
				});
			})
			.catch((err) => {
				console.log('Block By Height Error: ', err);
			});
	}
	return blocks;
};

export const getCurrentBlockHeight = async (): Promise<number> => {
	// @ts-ignore
	const { CasperServiceByJsonRPC } = browser && window.CasperSDK;
	const casperService = new CasperServiceByJsonRPC(get(rpcUrl));
	let currentHeight: number;
	await casperService
		.getLatestBlockInfo()
		.then((getBlockResult) => {
			currentHeight = getBlockResult.block.header.height;
		})
		.catch((err) => {
			console.log(err);
		});
	return currentHeight;
};

export const getBlock = async (address: string): Promise<Block> => {
	// @ts-ignore
	const { CasperServiceByJsonRPC } = browser && window.CasperSDK;
	const casperService = new CasperServiceByJsonRPC(get(rpcUrl));
	const currentHeight = await getCurrentBlockHeight();

	const addressType = checkBlockID(address, currentHeight);
	let getBlockResult;
	if (addressType === 'hash') {
		getBlockResult = await casperService.getBlockInfo(address).catch((err) => {
			console.log('Could not get block by hash: ', err);
		});
	} else if (addressType === 'height') {
		getBlockResult = await casperService.getBlockInfoByHeight(parseInt(address)).catch((err) => {
			console.log('Could not get block by height: ', err);
		});
	}
	let _block: Block;
	const { block } = getBlockResult && getBlockResult;
	_block = {
		height: block.header.height,
		eraID: block.header.era_id,
		transactions: block.body.deploy_hashes.length,
		timestamp: Date.parse(block.header.timestamp.toString()),
		hash: block.hash,
		validatorPublicKey: block.body.proposer,
		stateRootHash: block.header.state_root_hash,
		proofs: block.proofs
	};
	return _block;
};

export const getBlockTransfers = async (address: string): Promise<BlockTransfer[]> => {
	// @ts-ignore
	const { CasperServiceByJsonRPC } = browser && window.CasperSDK;
	const casperService = new CasperServiceByJsonRPC(get(rpcUrl));
	let blockTransfers: BlockTransfer[] = [];
	await casperService
		.getBlockTransfers(address)
		.then((transferResult) => {
			const { transfers } = transferResult;
			transfers.forEach((transfer) => {
				blockTransfers.push({
					deploy_hash: transfer.deployHash,
					from: transfer.from.substring('account-hash-'.length),
					to: transfer.to?.substring('account-hash-'.length) ?? null,
					source: transfer.source,
					target: transfer.target,
					amount: parseStringValue(transfer.amount),
					gas: transfer.gas,
					id: transfer.id
				});
			});
		})
		.catch((err) => {
			console.log(err);
		});
	return blockTransfers;
};

const checkBlockID = (id: any, currentHeight: number): 'hash' | 'height' | 'unknown' => {
	let idType: 'hash' | 'height' | 'unknown' = 'unknown';
	isNaN(id) && id.length == 64
		? (idType = 'hash')
		: !isNaN(id) && parseInt(id) > 0 && parseInt(id) < currentHeight
		? (idType = 'height')
		: 'unknown';
	return idType;
};
