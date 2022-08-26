<script>
	import BlockIcon from '$lib/icons/BlockIcon.svelte';

	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import TrustedIcon from '$lib/icons/TrustedIcon.svelte';
	import Overview from '$lib/components/Transactions/Overview.svelte';
	import TokenTransferred from '$lib/components/Transactions/TokenTransferred.svelte';

	let address = '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b';

	let transfers = [
		{
			toHash: '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b',
			fromHash: '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b',
			tokenName: 'Dai Stablecoin (DAI)',
			tokenValue: 350000000,
			tokenLogo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png'
		},
		{
			toHash: '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b',
			fromHash: '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b',
			tokenName: 'Dai Stablecoin (DAI)',
			tokenValue: 350000000,
			tokenLogo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png'
		},
		{
			toHash: '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b',
			fromHash: '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b',
			tokenName: 'Dai Stablecoin (DAI)',
			tokenValue: 350000000,
			tokenLogo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png'
		},
		{
			toHash: '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b',
			fromHash: '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b',
			tokenName: 'Dai Stablecoin (DAI)',
			tokenValue: 350000000,
			tokenLogo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png'
		},
		{
			toHash: '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b',
			fromHash: '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b',
			tokenName: 'Dai Stablecoin (DAI)',
			tokenValue: 350000000,
			tokenLogo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png'
		},
		{
			toHash: '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b',
			fromHash: '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b',
			tokenName: 'Dai Stablecoin (DAI)',
			tokenValue: 350000000,
			tokenLogo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png'
		}
	];

	let hash = '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b';
	let network = 'Mainnet';
	let transactionStatus = 'success';
	let block = 145332323;
	let timestamp = Date.parse('July 22, 2022 14:46');
	let nonce = 9;
	let value = 0;
	let gasUsed = 6434234;
	let gasPrice = 48.293;
	let gasLimit = 10000000;
	let fee = 0.338;
	let rawInput = '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b';
	let callerAddress = '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b';
	let contactAddress = '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b';
</script>

<div class="main">
	<div class="header">
		<div class="block-icon">
			<BlockIcon />
		</div>
		<div class="address">
			<div class="title">
				<div class="text">Address</div>
				<div class="trusted-icon">
					<TrustedIcon />
				</div>
			</div>
			<div class="value">
				<div class="text">
					{address}
				</div>
				<div class="copy-icon">
					<CopyIcon />
				</div>
			</div>
		</div>
	</div>

	<div class="info">
		<Overview
			{hash}
			{transactionStatus}
			{network}
			{block}
			{timestamp}
			{nonce}
			{value}
			{gasUsed}
			{gasPrice}
			{gasLimit}
			{fee}
			{rawInput}
			{callerAddress}
			{contactAddress}
		/>
		<TokenTransferred {transfers} />
	</div>

	<!-- TODO: Function Trace -->
</div>

<style lang="postcss">
	.address {
		@apply text-color-table-header;
	}
	.address > .value {
		@apply flex items-center gap-[clamp(4px,0.24vw,0.24vw)];
	}

	.address > .title {
		@apply font-bold text-[clamp(16px,1.19vw,1.19vw)];
		@apply flex items-center gap-[clamp(4px,0.48vw,0.48vw)];
	}

	.address > .value {
		@apply text-[clamp(8px,0.95vw,0.95vw)];
	}

	.copy-icon {
		@apply w-[clamp(16px,1.96vw,1.96vw)] h-[clamp(16px,1.96vw,1.96vw)];
		@apply cursor-pointer;
	}

	.trusted-icon {
		@apply h-[clamp(12px,0.95vw,0.95vw)] w-[clamp(12px,0.95vw,0.95vw)];
	}

	.header {
		@apply flex gap-[clamp(4px,1.31vw,1.31vw)] max-h-max;
		@apply mb-[1.79vw];
	}

	.info {
		@apply flex flex-col gap-[16px] md:gap-0 md:flex-row justify-between;
		@apply mb-[clamp(4px,3.51vw,3.51vw)];
	}
</style>
