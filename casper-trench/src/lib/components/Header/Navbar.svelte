<script lang="ts">
	// import CasperTrenchLogo from '$lib/icons/CasperTrenchLogo.svelte';
	import UserIcon from '$lib/icons/UserIcon.svelte';
	import NavbarDropdown from './NavbarDropdown.svelte';
	import { page } from '$app/stores';
	import { account } from '$stores/account';
	import Hash from '../TableData/Hash.svelte';
	import { disconnectWallet } from '$utils/wallets/connection';
	import { setContext } from 'svelte';
	import { getContext } from 'svelte';

	// const signedIn = false;

	// setContext('isSignedIn', signedIn);

	// function SignIn() {
	// 	const currentState = getContext('isSignedIn')
	// 	if (currentState === false) {
	// 		setContext('isSignedIn', true)
	// 	}
	// }
	

	let navItems: {
		text: string;
		link: string;
		dropdown: {
			text: string;
			link: string;
		}[];
	}[] = [
		{
			text: 'Blocks',
			link: '/blocks',
			dropdown: []
		},
		{
			text: 'Transactions',
			link: '/transactions',
			dropdown: []
		},
		// {
		// 	text: 'Contracts',
		// 	link: '/contracts',
		// 	dropdown: []
		// },
		// {
		// 	text: 'My Account',
		// 	link: `/accounts/${$account.publicKey}`,
		// 	dropdown: []
		// }
		// {
		// 	text: 'More',
		// 	link: '',
		// 	dropdown: [
		// 		{
		// 			text: 'Developers',
		// 			link: ''
		// 		},
		// 		{
		// 			text: 'Wallet Analyzer',
		// 			link: ''
		// 		},
		// 		{
		// 			text: 'Explore',
		// 			link: ''
		// 		}
		// 	]
		// },
		//{
		//	text: 'Wallet',
		//	link: '',
		//	dropdown: [
		//		{
		//			text: 'Transfer',
		//			link: '/wallet/transfer'
		//		},
		//		{
		//			text: 'Delegate Stake',
		//			link: '/wallet/delegate'
		//		},
		//		{
		//			text: 'Undelegate Stake',
		//			link: '/wallet/undelegate'
		//		}
		//	]
		//	}
	];
</script>

<div class="navbar">
	<a href="/" class="logo">
		<!-- <CasperTrenchLogo /> -->
	</a>
	<div class="nav-items">
		{#each navItems as navItem}
			<div class="nav-item">
				{#if navItem.dropdown.length > 0}
					<NavbarDropdown {navItem} />
				{:else}
					<div class="text" class:selected={$page.url.pathname === navItem.link}>
						<a href={navItem.link}>{navItem.text}</a>
					</div>
				{/if}
			</div>
		{/each}
		{#if $account}
			<button on:click={disconnectWallet}>
				<!-- <Hash hash={$account.publicKey} /> -->
				Disconnect Account
			</button>
		{:else}
			<!-- <a href="/sign-in" class="signin">
				<div class="user-icon">
					<UserIcon />
				</div>
				<div class="text">Connect Account</div>
			</a> -->
		{/if}
	</div>
</div>

<style lang="postcss">
	.navbar {
		@apply flex justify-between;
	}

	.nav-items {
		@apply hidden md:flex gap-[clamp(1vw,2vw,3vw)];
		@apply text-white text-opacity-50 text-[clamp(20px,1vw,1.5vw)];
	}

	.nav-item {
		@apply flex items-center cursor-pointer min-w-max;
	}

	.logo {
		@apply h-[clamp(16px,2.44vw,2.44vw)] w-[clamp(90px,9vw,9vw)];
	}

	/* .chevron {
		@apply h-[clamp(14px,0.95vw,0.95vw)] w-[clamp(14px,0.95vw,0.95vw)] ml-[clamp(4px,0.36vw,0.36vw)];
	} */

	.selected {
		@apply text-white text-opacity-100;
	}

	.signin {
		@apply flex items-center cursor-pointer;
		@apply text-white text-opacity-100;
	}

	.user-icon {
		@apply h-[clamp(14px,1.07vw,1.07vw)] w-[clamp(14px,1.07vw,1.07vw)] mr-[clamp(4px,0.36vw,0.36vw)];
	}
</style>
