<script>
	import { goto } from '$app/navigation';

	import ContractYellowWarningIcon from '$lib/icons/ContractYellowWarningIcon.svelte';
	import GreenCheckMarkIcon from '$lib/icons/GreenCheckMarkIcon.svelte';
	import SourceMapIcon from '$lib/icons/SourceMapIcon.svelte';
	import SwarmIcon from '$lib/icons/SwarmIcon.svelte';
	import ConstructorIcon from '$lib/icons/ConstructorIcon.svelte';
	import ContractAbiIcon from '$lib/icons/ContractAbiIcon.svelte';
	import ContractTabIcon from '$lib/icons/ContractTabIcon.svelte';

	import { sampleSolidityCode } from '$utils/sampleData';

	import CodeViewer from './CodeViewer.svelte';

	let verified = true;
	let hasWarning = true;
	let name = 'CryptoPort';
	let compilerVersion = 'v0.6.12+commit.27d51765';
	let optimization = 'No with 200 runs';
	let otherSettings = {
		text: 'Default evmVersion, BSD-3-Clause ',
		link: {
			text: 'license',
			url: ''
		}
	};
</script>

<div class="contract-code">
	<div class="header">
		<div class="top">
			<div class="verified">
				<div class="icon">
					<GreenCheckMarkIcon green />
				</div>
				<div class="text">
					Contract Source Code{verified ? ' Verified ' : ' Not Verified '}
					{#if verified}
						<span class="grey">(Exact Match)</span>
					{/if}
				</div>
			</div>
			{#if hasWarning}
				<div class="warning">
					<ContractYellowWarningIcon />
				</div>
			{/if}
		</div>

		<div class="extras">
			<table>
				<tr>
					<td class="label"> Contract Name </td>
					<td class="value">{name}</td>
				</tr>
				<tr>
					<td class="label"> Compiler Version </td>
					<td class="value">{compilerVersion}</td>
				</tr>
			</table>

			<table>
				<tr>
					<td class="label"> Optimization Enabled </td>
					<td class="value">{optimization}</td>
				</tr>
				<tr>
					<td class="label"> Other Settings </td>
					<td class="value"
						>{otherSettings.text}
						<span
							class="green"
							on:click={() => {
								goto(otherSettings.link.url);
							}}>{otherSettings.link.text}</span
						></td
					>
				</tr>
			</table>
		</div>
	</div>

	<div class="content">
		<CodeViewer outlineDropdown moreOptionsDropdown codeHeader code={sampleSolidityCode}>
			<div class="code-icon">
				<ContractTabIcon />
			</div>
			<div class="title-text">
				Contract Source Code <span class="grey">(Solidity)</span>
			</div>
		</CodeViewer>

		<CodeViewer>
			<div class="code-icon">
				<ContractTabIcon />
			</div>
			<div class="title-text">Contract Security</div>
		</CodeViewer>

		<CodeViewer outlineCodeHeader code={sampleSolidityCode}>
			<div class="code-icon">
				<ContractAbiIcon />
			</div>
			<div class="title-text">Contract ABI</div>
		</CodeViewer>

		<CodeViewer decompileButton opCodesButton code={sampleSolidityCode}>
			<div class="code-icon">
				{'</>'}
			</div>
			<div class="title-text">Contract Creation Code</div>
		</CodeViewer>

		<CodeViewer code={sampleSolidityCode}>
			<div class="code-icon">
				<ConstructorIcon />
			</div>
			<div class="title-text">
				Constructor Arguments <span class="grey"
					>(ABI-Encoded and is the last bytes of the Contract Creation Code above)</span
				>
			</div>
		</CodeViewer>

		<CodeViewer code={sampleSolidityCode}>
			<div class="code-icon">
				<SourceMapIcon />
			</div>
			<div class="title-text">Deployed ByteCode Sourcemap</div>
		</CodeViewer>

		<CodeViewer code={sampleSolidityCode}>
			<div class="code-icon">
				<SwarmIcon />
			</div>
			<div class="title-text">Swarm Source</div>
		</CodeViewer>
	</div>
</div>

<style lang="postcss">
	.top {
		@apply flex justify-between;
		@apply mb-[clamp(16px,1.79vw,1.79vw)];
	}

	.contract-code {
		@apply text-[clamp(16px,1.07vw,1.07vw)] text-color-table-header;
	}

	.grey {
		@apply text-color-grey-footer-label;
	}

	.verified {
		@apply flex gap-[clamp(4px,0.36vw,0.36vw)] items-center;
		@apply font-medium;
	}

	.verified > .icon {
		@apply w-[0.95vh] h-[0.95vh] md:w-[0.95vw] md:h-[0.95vw];
	}

	.text {
		@apply min-w-max;
	}

	.warning {
		@apply w-[1.67vh] h-[1.43vh] md:w-[1.67vw] md:h-[1.43vw];
	}

	.label {
		@apply font-bold text-[clamp(12px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply md:w-[13.93vw];
	}

	.value {
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-table-header;
		@apply flex items-center gap-[clamp(4px,0.24vw,0.24vw)];
		@apply min-w-max;
	}

	td {
		@apply pb-[clamp(4px,1.79vw,1.79vw)];
		@apply align-top;
	}

	.extras {
		@apply flex;
		@apply w-full;
	}

	table {
		@apply w-full;
	}

	.green {
		@apply text-color-hover-footer-link;
	}

	.header {
		@apply border-b-color-contract-header-border border-b-[clamp(1px,0.06vw,0.06vw)];
	}

	.title-text {
		@apply font-bold;
	}

	.code-icon {
		@apply w-[1.79vh] h-[1.79vh] md:w-[1.79vw] md:h-[1.79vw];
	}
</style>
