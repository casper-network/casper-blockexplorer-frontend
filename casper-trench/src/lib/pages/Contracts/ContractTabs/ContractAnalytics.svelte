<script>
	import Switch from '$lib/components/Reusables/Switch.svelte';

	const options = [
		{
			name: 'Transactions',
			dropdown: []
		},
		{
			name: 'BNB Balance',
			dropdown: []
		},
		{
			name: 'TxnFees',
			dropdown: []
		},
		{
			name: 'BNB Transfers',
			dropdown: []
		}
	];

	let selected = 0;
</script>

<div class="contract-analytics">
	<Switch {options} bind:selected />
</div>

<style>
</style>
