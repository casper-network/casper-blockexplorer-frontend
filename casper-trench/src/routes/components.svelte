<script>
	import TableSorter from '$lib/components/Reusables/TableSorter.svelte';

	import Tooltip from '$lib/components/Reusables/Tooltip.svelte';

	import TabMenu from '$lib/components/TabMenu/index.svelte';
	import SampleComponent2 from '$lib/components/TabMenu/SampleComponent2.svelte';

	let menuOptions = [
		{
			title: 'Table',
			component: ''
		},
		{
			title: 'Empty',
			component: SampleComponent2
		}
	];
</script>

<div class="components">
	<div class="flex gap-[1vw]">
		<Tooltip text="Hello World" />
		<TableSorter on:sort-ascend={() => {}} on:sort-descend={() => {}} />
	</div>
	<TabMenu {menuOptions} />
</div>

<style lang="postcss">
	.components {
		@apply p-[clamp(16px,3.57vw,3.57vw)];
		@apply flex flex-col gap-[1vw];
	}
</style>
