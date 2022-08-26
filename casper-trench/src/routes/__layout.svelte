<script>
	import '$styles/tailwind.css';
	import '$styles/custom.css';
	import BottomFooter from '$components/BottomFooter/index.svelte';
	import Footer from '$components/Footer/index.svelte';
	import Header from '$components/Header/index.svelte';
	import SvelteLoader from '$components/SvelteLoader/index.svelte';
	import Toast from '$components/Toast/index.svelte';
	import { isLoading } from '$stores/loading';
	import nodePackages from '$utils/nodePackages?url';
	import { account } from '$stores/account';
	import { beforeUpdate } from 'svelte';
	import { setCSPRPrice } from '$utils';
	import { setConstructors } from '$utils/chain/helper';
	import { pollValidatorData } from '$utils/chain/validators';

	beforeUpdate(async () => {
		setConstructors();
		$account = JSON.parse(localStorage.getItem('account'));
		await setCSPRPrice();
		await pollValidatorData();
	});
</script>

<svelte:head>
	<title>Casper.info</title>
	<script src={nodePackages}></script>
</svelte:head>

<Header />
<main>
	<slot />
</main>
<Footer />
<BottomFooter />

<Toast />
{#if $isLoading}
	<SvelteLoader />
{/if}

<style lang="postcss">
	main {
		@apply min-w-full;
		@apply pt-[clamp(30px,3.6vw,3.6vw)] pb-[clamp(40px,4.6vw,4.6vw)] px-[clamp(20px,3.8vw,3.8vw)];
	}
</style>
