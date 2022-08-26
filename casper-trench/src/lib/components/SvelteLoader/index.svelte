<script lang="ts">
	import { DoubleBounce } from 'svelte-loading-spinners';
</script>

<div class="fixed inset-0 z-50 bg-white bg-opacity-90">
	<div class="centered">
		<DoubleBounce color="#099B91" />
	</div>
</div>

<style lang="postcss">
	.centered {
		@apply flex justify-center items-center flex-col;
		@apply h-screen w-full;
	}
</style>
