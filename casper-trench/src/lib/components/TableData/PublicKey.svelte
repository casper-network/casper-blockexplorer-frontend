<script>
	import { aTimeAgo } from '$utils/converters';
	import Hash from './Hash.svelte';

	export let activeDate = Date.parse('July 8, 2022, 14:47');
	export let hash = '';
	export let text = '';

	const diff = Date.now() - activeDate;
	const textString = aTimeAgo(diff);
</script>

<div class="block-height">
	{#if hash.length > 0}
		<Hash {hash} noOfCharacters={10} variant="right" on:click />
	{:else}
		<div class="text">
			{text}
		</div>
	{/if}
	<div class="time-ago">
		Active {textString} ago
	</div>
</div>

<style lang="postcss">
	.text {
		@apply text-color-hover-footer-link;
	}
	.time-ago {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header text-opacity-50;
	}
</style>
