<script>
	import { slide } from 'svelte/transition';

	export let proofs = [];

	let pages = [];
	pages = [];
	let pos = 0;
	export let proofsPerPage = 5;
	let useArray = [...proofs];
	while (useArray.length) {
		pages.push({
			pos,
			data: useArray.splice(0, proofsPerPage)
		});
		pos++;
	}

	let currentPage = 0;
</script>

<div class="proofs" transition:slide>
	{#each pages[currentPage].data as proof, i}
		<div class="proof" transition:slide>
			<div class="num">{pages[currentPage].pos * 5 + i + 1}</div>
			<table>
				<tr>
					<td class="label"> Public Key </td>
					<td class="value key">
						<a href="/accounts/{proof.public_key}">
							{proof.public_key || ''}
						</a>
					</td>
				</tr>
				<tr>
					<td class="label"> Signature </td>
					<td class="value signature">
						{proof.signature || ''}
					</td>
				</tr>
			</table>
		</div>
	{/each}
	<div class="paginator">
		{#each pages as _, i}
			<div class="button" class:selected={currentPage === i} on:click={() => (currentPage = i)}>
				{i + 1}
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.proof {
		@apply flex;
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-table-header;
		@apply pb-[clamp(4px,0.48vw,0.48vw)] pt-[clamp(16px,1.19vw,1.19vw)];
		@apply border-b-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
	}

	.num {
		@apply w-[1.55vh] h-[1.55vh] md:w-[1.55vw] md:h-[1.55vw];
		@apply flex items-center justify-center;
		@apply rounded-full;
		@apply bg-color-proof-num-background;
		@apply mr-[clamp(20px,1.61vw,1.61vw)];
		@apply text-[clamp(10px,0.95vw,0.95vw)] text-color-grey-footer-label;
	}

	.label {
		@apply md:w-[7.14vw];
		@apply align-top;
	}

	.value {
		@apply md:max-w-[47.5vw];
		@apply break-words;
	}

	td {
		@apply pb-[clamp(4px,0.6vw,0.6vw)];
	}

	.key {
		@apply text-color-hover-footer-link;
	}

	.signature {
		@apply text-color-grey-footer-label;
	}

	.proofs {
		@apply flex flex-col items-center;
	}

	.paginator {
		@apply flex gap-[clamp(8px,0.71vw,0.71vw)];
	}

	.button {
		@apply w-[clamp(20px,1.96vw,1.96vw)] h-[clamp(20px,1.96vw,1.96vw)];
		@apply flex items-center justify-center;
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply cursor-pointer;
		@apply text-[clamp(12px,0.95vw,0.95vw)] text-color-grey-footer-label;
		@apply transition-all;
	}

	.selected {
		@apply border-color-hover-footer-link border-[clamp(1px,0.12vw,0.12vw)];
		@apply text-color-hover-footer-link;
	}
</style>
