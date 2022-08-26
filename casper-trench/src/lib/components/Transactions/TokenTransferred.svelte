<script>
	import BlockIcon from '$lib/icons/BlockIcon.svelte';

	import Hash from '$components/TableData/Hash.svelte';

	export let transfers = [];
</script>

<div class="token-transferred">
	<div class="title">TOKEN TRANSFERRED</div>
	<div class="extras">
		<table>
			{#each transfers as transfer}
				<tr>
					<td>
						<div class="label">To</div>
						<div class="value">
							<div class="icon">
								<BlockIcon />
							</div>
							<div class="hash">
								<Hash hash={transfer.toHash} noOfCharacters={4} />
							</div>
						</div>
					</td>
					<td>
						<div class="label">From</div>
						<div class="value">
							<div class="icon">
								<BlockIcon />
							</div>
							<div class="hash">
								<Hash hash={transfer.fromHash} noOfCharacters={4} />
							</div>
						</div>
					</td>
					<td>
						<div class="label">
							<img src={transfer.tokenLogo} alt="token-logo" />
							<div class="text">{transfer.tokenName}</div>
						</div>
						<div class="value token-value">
							{transfer.tokenValue.toLocaleString()}
						</div>
					</td>
				</tr>
			{/each}
		</table>
	</div>
</div>

<style lang="postcss">
	.token-transferred {
		@apply pt-[clamp(16px,1.73vw,1.73vw)] pb-[clamp(16px,2.08vw,2.08vw)] pl-[clamp(16px,1.43vw,1.43vw)] pr-[clamp(16px,1.90vw,1.90vw)];
		@apply w-full md:w-[37.86vw];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply rounded-[0.89vh] md:rounded-[0.89vw];
		@apply text-color-table-header;
	}

	td {
		@apply pb-[clamp(4px,1.07vw,1.07vw)];
	}

	table {
		@apply w-full;
	}

	.extras {
		@apply md:ml-[0.23vw] md:mr-[1.25vw];
	}

	.title {
		@apply text-color-table-header text-[clamp(12px,1.19vw,1.19vw)] font-bold;
		@apply pb-[clamp(4px,1.19vw,1.19vw)] mb-[clamp(4px,1.61vw,1.61vw)];
		@apply border-b-[clamp(1px,0.09vw,0.09vw)] border-color-tooltip-border;
	}

	.label {
		@apply text-[clamp(10px,0.83vw,0.83vw)] align-middle;
		@apply flex items-center gap-[clamp(4px,0.3vw,0.3vw)];
		@apply mb-[clamp(4px,0.3vw,0.3vw)];
	}

	.label > img {
		@apply h-[1.3vh] w-[1.3vh] md:h-[1.3vw] md:w-[1.3vw];
	}

	.icon {
		@apply h-[1.19vh] w-[1.19vh] md:h-[1.19vw] md:w-[1.19vw];
	}

	.value {
		@apply flex items-center gap-[clamp(4px,0.3vw,0.3vw)];
	}

	.token-value {
		@apply text-[clamp(12px,0.95vw,0.95vw)];
	}
</style>
