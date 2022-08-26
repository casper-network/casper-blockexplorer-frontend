<div class="bottom-footer">
	<img src="/images/png/temp-b-footer-bg.png" alt="bg" class="bg" draggable="false" />
	<div class="versions">
		<div>1.10.0 (4287b143)</div>
		<div>Node version: 1.4.6 (72b698e89)</div>
		<!-- <div>Quote Data provided by CoinGecko API</div> -->
	</div>
</div>

<style lang="postcss">
	.bottom-footer {
		@apply relative py-[clamp(16px,1.43vw,1.43vw)] px-[clamp(16px,3.75vw,3.75vw)] flex;
		/* remove */
		@apply h-[clamp(50px,5.71vw,5.71vw)];
	}

	.bg {
		@apply absolute inset-0 -z-10 w-full h-full block;
	}

	.versions {
		@apply text-white text-[clamp(8px,0.65vw,0.65vw)];
	}
</style>
