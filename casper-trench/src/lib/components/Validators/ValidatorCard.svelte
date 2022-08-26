<script lang="ts">
	import FacebookGreenLogo from '$lib/icons/FacebookGreenLogo.svelte';

	import GithubGreenLogo from '$lib/icons/GithubGreenLogo.svelte';
	import OpenIcon from '$lib/icons/OpenIcon.svelte';
	import TelegramGreenLogo from '$lib/icons/TelegramGreenLogo.svelte';
	import TwitterGreenLogo from '$lib/icons/TwitterGreenLogo.svelte';
	import VerifiedIcon from '$lib/icons/VerifiedIcon.svelte';
	import type { Bid } from '$utils/types/validator';

	import Button from '../Reusables/Button.svelte';
	export let validator: Bid;
</script>

{#if validator}
	<div class="validator-card">
		<div class="logo" class:inactive={validator.inactive}>
			{#if validator.icon}
				<img src={validator.icon} alt="validator-logo" />
			{:else}
				<img src="/images/png/validator-placeholder.png" alt="validator-logo" />
			{/if}
			{#if !validator.inactive}
				<div class="online-dot" />
			{/if}
		</div>
		<div class="name-wrapper">
			{#if validator.name}
				<div class="name">{validator.name}</div>
				<div class="verified-icon">
					<VerifiedIcon />
				</div>
			{/if}
		</div>
		<div class="details">
			{validator.details || ''}
		</div>
		<div class="extras">
			<div class="labels-values">
				{#if validator.website}
					<div class="label">Website</div>
				{/if}
				{#if validator.email}
					<div class="label">Email</div>
				{/if}
				{#if validator.links}
					<div class="label">Socials</div>
				{/if}
			</div>
			<div class="validator-values">
				{#if validator.website}
					<a class="value" href={validator.website}>
						<div class="text">
							{validator.website}
						</div>
						<div class="open-icon">
							<OpenIcon />
						</div>
					</a>
				{/if}
				{#if validator.email}
					<div class="value">
						<a href="mailto:{validator.email}" class="text">
							{validator.email}
						</a>
					</div>
				{/if}
				<div class="socials">
					{#if validator?.links && validator?.links.length > 0}
						{#each validator.links as link}
							{#if link.tag === 'Twitter'}
								<a href={link.link} class="social"><TwitterGreenLogo /></a>
							{/if}
							{#if link.tag === 'Facebook'}
								<a href={link.link} class="social"><FacebookGreenLogo /></a>
							{/if}
							{#if link.tag === 'Telegram'}
								<a href={link.link} class="social"><TelegramGreenLogo /></a>
							{/if}
							{#if link.tag === 'Github'}
								<a href={link.link} class="social"><GithubGreenLogo /></a>
							{/if}
						{/each}
					{/if}
				</div>
			</div>
		</div>
		<div class="buttons">
			<Button gradient>Delegate</Button>
			<Button red>Undelegate</Button>
		</div>
	</div>
{/if}

<style lang="postcss">
	.validator-card {
		@apply flex flex-col items-center;
		@apply pt-[3.39vw] pb-[3.21vw] px-[2.68vw];
		@apply w-full md:w-[32.32vw];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply rounded-[0.89vw];
	}

	.logo {
		@apply w-[9.01vw] h-[9.01vw];
		@apply p-[0.24vw];
		@apply border-color-arcadia-green border-[clamp(1px,0.24vw,0.24vw)];
		@apply rounded-full;
		@apply relative;
		@apply mb-[1.19vw];
	}

	.logo.inactive {
		@apply border-color-arcadia-red;
	}

	img {
		@apply rounded-full;
		@apply w-full h-full;
	}

	.online-dot {
		@apply absolute;
		@apply w-[1.19vw] h-[1.19vw];
		@apply bg-color-arcadia-green;
		@apply rounded-full;
		@apply bottom-0 right-0;
		@apply transform translate-y-[-0.55vw] translate-x-[-0.55vw] z-30;
	}

	.verified-icon,
	.open-icon {
		@apply w-[1.31vw] h-[1.31vw];
	}

	.name-wrapper {
		@apply flex items-center gap-[0.24vw];
		@apply mb-[1.37vw];
	}

	.name {
		@apply font-medium text-[clamp(16px,1.55vw,1.55vw)] text-color-table-header;
	}

	.details {
		@apply text-color-table-header text-[clamp(12px,0.95vw,0.95vw)];
		@apply mb-[1.19vw];
	}

	.labels-values > .label {
		@apply font-bold text-[clamp(12px,1.07vw,1.07vw)] text-color-grey-footer-label;
	}

	.validator-values > .value {
		@apply text-[1.07vw] text-color-hover-footer-link;
	}

	.extras {
		@apply flex items-center justify-between;
		@apply w-full;
		@apply pr-[3.33vw];
		@apply mb-[2.32vw];
	}

	.extras > div {
		@apply h-full;
		@apply flex flex-col justify-between gap-[1.5vw];
		@apply leading-none;
	}

	.validator-values > .value {
		@apply flex flex-row items-center gap-[0.48vw];
	}

	.validator-values > .value > .text {
		@apply cursor-pointer;
	}

	.buttons {
		@apply flex items-center gap-[2.98vw] flex-row;
	}

	.socials {
		@apply flex items-center gap-[1.31vw];
	}

	.social {
		@apply h-[0.83vw];
		@apply cursor-pointer;
	}
</style>
