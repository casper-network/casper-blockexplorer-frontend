<script lang="ts">
	export let text = '';
	export let data;

	let expanded = true;
	let dataArray: any[] = [''];

	if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
		dataArray = [];
		for (const key in data) {
			dataArray.push({ key, data: data[key] });
		}
	} else if (Array.isArray(data)) {
		dataArray = [];
		data.forEach((item, key) => {
			dataArray.push({ key: key.toString(), data: item });
		});
	}
</script>

<div class="toggle">
	{#if typeof data === 'object' && data !== null}
		{#if data.length === 0 || data === {}}
			<div class="tab">
				<span />
			</div>
		{:else}
			<span
				class="jv-toggle"
				class:expanded
				on:click={() => {
					expanded = !expanded;
				}}
			/>
		{/if}
	{/if}
	{#if text}
		<span>{text}: </span>
	{/if}
	{#if !expanded}
		{#if typeof data === 'object' && !Array.isArray(data) && data !== null}
			{'{ '}
			{#if typeof data === 'object' && (data.length === 0 || data === {})}
				<span />
			{:else}
				<span
					class="dots"
					on:click={() => {
						expanded = true;
					}}>...</span
				>
			{/if}
			{' }'}
		{:else if Array.isArray(data)}
			{'[ '}
			{#if typeof data === 'object' && (data.length === 0 || data === {})}
				<span />
			{:else}
				<span
					class="dots"
					on:click={() => {
						expanded = true;
					}}>...</span
				>
			{/if}
			{' ]'}
		{/if}
	{:else}
		{#if typeof data === 'object' && !Array.isArray(data) && data !== null}
			<span>{'{'}</span>
		{:else if Array.isArray(data)}
			<span>{'['}</span>
		{/if}

		{#each dataArray as item}
			{#if item && typeof item.data === 'object' && item.data !== null}
				<div class="tab">
					<svelte:self text={item.key} data={item.data} />
				</div>
			{:else if typeof item.data === 'string'}
				<div class="tab">
					<div class="string">
						<span>{item.key ? item.key : 'null'} : "{item.data}"</span>
					</div>
				</div>
			{:else if typeof item.data === 'number'}
				<div class="tab">
					<div class="number">
						{item.key ? item.key : 'null'} : <span>{item.data}</span>
					</div>
				</div>
			{:else if item.data === null}
				<div class="tab">
					<div class="null">
						{item.key ? item.key : 'null'} : <span>null</span>
					</div>
				</div>
			{/if}
		{/each}

		{#if typeof data === 'object' && !Array.isArray(data) && data !== null}
			<div>{'}'}</div>
		{:else if Array.isArray(data)}
			<div>{']'}</div>
		{/if}
	{/if}
</div>

<style lang="postcss">
	.dots {
		@apply bg-color-ago-background;
		@apply cursor-pointer;
		@apply p-[0.1vh] md:p-[0.1vw];
	}

	.jv-toggle {
		@apply bg-[url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE2IiB3aWR0aD0iOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjNjY2IiBkPSJNMCAwbDggOC04IDh6Ii8+PC9zdmc+)] bg-no-repeat bg-contain bg-center;
		@apply cursor-pointer;
		@apply w-[0.52vh] h-[0.52vh] md:w-[0.52vw] md:h-[0.52vw];
		@apply mr-[0.1vw];
		@apply inline-block;
		@apply transition-all;
	}

	.expanded {
		@apply rotate-90;
	}

	.tab {
		@apply pl-[1vh] md:pl-[1vw];
	}
</style>
