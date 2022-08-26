<script>
	import ContractChevron from '$lib/icons/ContractChevron.svelte';
	import ErrorTreeIcon from '$lib/icons/ErrorTreeIcon.svelte';
	import { slide } from 'svelte/transition';

	export let readFunction;
	export let i;
	export let error = '';

	let inputTexts = [];
	readFunction.inputs.forEach(() => {
		inputTexts.push('');
	});

	let expanded = false;

	let response;

	const queryHandler = () => {
		let argsMet = 0;
		if (readFunction.inputs.length > 0) {
			inputTexts.forEach((text, i) => {
				if (text === null || text.length === 0) {
					error = `Error: Invalid number of parameters for "${readFunction.name}". Got ${argsMet} expected ${inputTexts.length}!`;
					response = null;
					return;
				}
				if (inputTexts.length - 1 === i) {
					response = readFunction.reply(inputTexts);
					error = '';
				}
				argsMet++;
			});
		} else {
			response = readFunction.reply(inputTexts);
			error = '';
		}
	};
</script>

<div class="function-browser" class:borders={expanded}>
	<div class="top" on:click={() => (expanded = !expanded)}>
		<div class="text">
			{`${i + 1}. ${readFunction.name}`}
		</div>
		<div class="icon" class:expanded>
			<ContractChevron right />
		</div>
	</div>
	{#if expanded}
		<div class="dropdown" transition:slide>
			<div class="inputs">
				{#if readFunction.inputs.length > 0}
					{#each readFunction.inputs as input, i}
						<div class="label">
							{input.name} ({input.type})
						</div>
						{#if input.type.toLowerCase() === 'string'}
							<input
								type="text"
								placeholder={`${input.name} (${input.type})`}
								bind:value={inputTexts[i]}
							/>
						{:else if input.type.includes('uint') | input.type.includes('float')}
							<input
								type="number"
								placeholder={`${input.name} (${input.type})`}
								bind:value={inputTexts[i]}
							/>
						{/if}
					{/each}
				{/if}

				<div class="query" on:click={queryHandler}>Query</div>
				{#if error.length > 0}
					<div class="error" transition:slide>
						<div class="tree">
							<ErrorTreeIcon />
						</div>
						<div class="text">
							<span>{readFunction.expected}</span>
							{error}
						</div>
					</div>
				{/if}
			</div>
			{#if response}
				<div class="response">
					<span class="value"
						>{response.type === 'string' ? `"` : ``}{response.data}{response.type === 'string'
							? `"`
							: ``}</span
					>
					<span class="type">{response.type}</span>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	.top {
		@apply flex items-center justify-between;
		@apply p-[clamp(12px,0.95vw,0.95vw)];
		@apply bg-color-function-browser-bg;
		@apply cursor-pointer;
		@apply border-color-progress-bg border-[clamp(1px,0.06vw,0.06vw)];
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
	}

	.top > .icon {
		@apply w-[0.54vw] h-[0.33vw];
		@apply transition-all;
	}

	.function-browser {
		@apply my-[clamp(16px,1.67vw,1.67vw)];
		@apply text-color-table-header;
	}

	.borders {
		@apply border-color-progress-bg border-[clamp(1px,0.06vw,0.06vw)];
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
	}

	.expanded {
		@apply rotate-90;
	}

	.dropdown {
		@apply p-[clamp(16px,1.43vw,1.43vw)];
	}

	.label {
		@apply mb-[clamp(12px,0.95vw,0.95vw)];
	}

	input {
		@apply px-[clamp(16px,1.19vw,1.19vw)] py-[clamp(8px,0.83vw,0.83vw)];
		@apply w-full;
		@apply outline-color-hover-footer-link;
		@apply mb-[clamp(12px,0.95vw,0.95vw)];
	}

	.query {
		@apply border-color-hover-footer-link border-[clamp(1px,0.06vw,0.06vw)];
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply max-w-max;
		@apply p-[clamp(8px,0.6vw,0.6vw)];
		@apply bg-color-query-green;
		@apply cursor-pointer;
		@apply mb-[clamp(12px,0.95vw,0.95vw)];
	}

	.error {
		@apply text-color-arcadia-red;
		@apply mb-[clamp(12px,0.95vw,0.95vw)];
		@apply flex items-center gap-[clamp(4px,0.48vw,0.48vw)];
	}

	.tree {
		@apply h-[0.48vh] w-[0.3vh] md:h-[0.7vw] md:w-[0.5vw];
		@apply ml-[clamp(8px,0.71vw,0.71vw)];
	}

	.error > .text > span {
		@apply text-color-table-header;
	}

	.value {
		@apply text-color-hover-footer-link;
	}
</style>
