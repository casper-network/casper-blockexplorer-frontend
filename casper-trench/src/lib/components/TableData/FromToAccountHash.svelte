<script lang="ts">
	import Hash from './Hash.svelte';

	export let isFrom = false;
	export let cspr: number;
	export let hash: string;
	export let link = '';
</script>

<div class="from-to-hash">
	{#if link}
		<a href={link}>
			<Hash {hash} noOfCharacters={6} color={`${isFrom ? 'black' : 'text'}`} />
		</a>
	{:else}
		<Hash {hash} noOfCharacters={6} color={`${isFrom ? 'black' : 'text'}`} />
	{/if}
	<div class="value-crypto">
		<div class="crypto">
			{cspr.toFixed(5)}
		</div>
		<div class="cspr">CSPR</div>
	</div>
</div>

<style lang="postcss">
	.from-to-hash {
		@apply text-right max-w-max;
		@apply flex flex-col items-end;
	}

	.value-crypto {
		@apply flex items-center gap-[clamp(2px,0.24vw,0.24vw)];
	}

	.crypto {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header;
	}

	.cspr {
		@apply text-color-grey-footer-label text-[clamp(8px,0.83vw,0.83vw)];
	}
</style>
