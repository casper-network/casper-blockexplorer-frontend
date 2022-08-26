<script>
	import FileIcon from '$lib/icons/FileIcon.svelte';
	import FunctionBrowser from './FunctionBrowser.svelte';

	let readFunctions = [
		{
			name: 'CalculateTokensAmountForUsdt',
			inputs: [
				{
					type: 'uint256',
					name: 'usdtAmount'
				}
			],
			reply: (v) => {
				return {
					data: v[0],
					type: 'uint256'
				};
			},
			expected: 'uint256'
		},
		{
			name: 'RegisterTestUser',
			inputs: [
				{
					type: 'uint256',
					name: 'age'
				},
				{
					type: 'string',
					name: 'uName'
				}
			],
			reply: (v) => {
				return {
					data: `${v[1]} of ${v[0]} years`,
					type: 'string'
				};
			},
			expected: 'string'
		},
		{
			name: 'getMinAmountToStake',
			inputs: [],
			reply: () => {
				return {
					data: 227150359072507726715940695,
					type: 'uint256'
				};
			},
			expected: 'uint256'
		}
	];

	let reset = 0;
</script>

<div class="contract-read">
	<div class="header">
		<div class="title">
			<div class="code-icon">
				<FileIcon />
			</div>
			<div class="title-text">Read Contract Information</div>
		</div>
		<div
			class="reset"
			on:click={() => {
				reset++;
			}}
		>
			Reset
		</div>
	</div>

	{#key reset}
		{#each readFunctions as readFunction, i}
			<FunctionBrowser {readFunction} {i} />
		{/each}
	{/key}
</div>

<style lang="postcss">
	.contract-read {
		@apply text-[clamp(16px,1.07vw,1.07vw)] text-color-table-header;
	}
	.title {
		@apply flex items-center gap-[clamp(2px,0.3vw,0.3vw)];
	}

	.title-text {
		@apply font-bold;
	}

	.code-icon {
		@apply w-[1.79vh] h-[1.79vh] md:w-[1.79vw] md:h-[1.79vw];
	}

	.header {
		@apply flex justify-between;
	}

	.reset {
		@apply text-color-hover-footer-link;
		@apply cursor-pointer;
	}
</style>
