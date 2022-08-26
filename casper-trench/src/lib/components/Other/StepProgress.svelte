<script lang="ts">
	import ProgressCheckMarkIcon from '$lib/icons/ProgressCheckMarkIcon.svelte';
	import ProgressMarker from '$lib/icons/ProgressMarker.svelte';

	export let step: 0 | 1 | 2 | 3 = 0;
	export let page = '';

	let progressClass = '';
	let iconClass = '';

	$: switch (step) {
		case 0:
			progressClass = 'w-[7vw]';
			iconClass = 'translate-x-[-0.5vw]';
			break;
		case 1:
			progressClass = 'w-[12vw]';
			iconClass = 'translate-x-[11.5vw]';
			break;
		case 2:
			progressClass = 'w-[21vw]';
			iconClass = 'translate-x-[20.75vw]';
			break;
		default:
			progressClass = 'w-full';
			iconClass = 'translate-x-[29.25vw]';
			break;
	}
</script>

<div class="step-progress">
	<div class="progress-bar">
		<div class="icon translate-x-[-0.5vw] check-mark" class:checked={step > 0}>
			<ProgressCheckMarkIcon />
		</div>
		<div class="icon translate-x-[11.5vw] check-mark" class:checked={step > 1}>
			<ProgressCheckMarkIcon />
		</div>
		<div class="icon translate-x-[20.75vw] check-mark" class:checked={step > 2}>
			<ProgressCheckMarkIcon />
		</div>
		<div class="icon translate-x-[29.25vw] check-mark" class:checked={step > 3}>
			<ProgressCheckMarkIcon />
		</div>
		<div class="icon {iconClass}">
			<ProgressMarker />
		</div>
		<div class="progress {progressClass}" />
	</div>
	<div class="step-text">
		<div class="text" class:selected={step === 0}>
			{page}
		</div>
		<div class="text" class:selected={step === 1}>Confirm</div>
		<div class="text" class:selected={step === 2}>Sign</div>
		<div class="text" class:selected={step === 3}>Done</div>
	</div>
</div>

<style lang="postcss">
	.step-text {
		@apply flex items-center md:gap-[7vw];
		@apply text-[clamp(12px,0.95vw,0.95vw)] text-color-grey-footer-label;
	}

	.step-progress {
		@apply flex items-center flex-col gap-[1.55vw];
	}

	.selected {
		@apply text-color-hover-footer-link;
	}

	.progress-bar {
		@apply md:w-[30vw] md:h-[0.12vw];
		@apply bg-color-step-progress-bar-bg;
		@apply transform translate-x-[1.2vw];
	}

	.icon {
		@apply md:h-[1.07vw] md:w-[1.07vw];
		@apply transform translate-y-[-0.5vw];
		@apply absolute;
		@apply transition-all;
	}

	.progress {
		@apply h-full bg-color-hover-footer-link;
		@apply transition-all;
	}

	.check-mark {
		@apply transform scale-0;
		@apply transition-all;
	}

	.checked {
		@apply scale-100;
	}
</style>
