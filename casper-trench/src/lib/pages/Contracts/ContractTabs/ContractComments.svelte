<script>
	import Hash from '$lib/components/TableData/Hash.svelte';
	import BlockIcon from '$lib/icons/BlockIcon.svelte';

	let comments = [
		{
			address: '0x938fd38890f207a8700bn294b8902f4f24',
			comment: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.`
		},
		{
			address: '0x938fd38890f207a8700bn294b8902f4f24',
			comment: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.`
		},
		{
			address: '0x938fd38890f207a8700bn294b8902f4f24',
			comment: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.`
		},
		{
			address: '0x938fd38890f207a8700bn294b8902f4f24',
			comment: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.`
		}
	];

	let value = '';
</script>

<div class="contract-comments">
	{#each comments as comment}
		<div class="comment">
			<div class="icon">
				<BlockIcon />
			</div>
			<div class="content">
				<div class="address">
					<Hash hash={comment.address} start noOfCharacters={20} color="black" bold />
				</div>
				<div class="data">
					{comment.comment}
				</div>
			</div>
		</div>
	{/each}
	<div class="comment">
		<div class="icon">
			<BlockIcon />
		</div>
		<div class="content">
			<textarea bind:value placeholder="Share your idea" />
		</div>
		<div class="send">
			<span class="green">Sign In</span> to comments
		</div>
	</div>
</div>

<style lang="postcss">
	.comment {
		@apply flex gap-[clamp(12px,0.95vw,0.95vw)];
		@apply py-[clamp(16px,1.67vw,1.67vw)];
		@apply text-[clamp(12px,0.95vw,0.95vw)];
		@apply border-b-color-ago-background border-b-[clamp(1px,0.06vw,0.06vw)];
	}

	.icon {
		@apply w-[2.4vh] h-[2.4vh] md:w-[2.4vw] md:h-[2.4vw];
	}

	.data {
		@apply text-color-grey-footer-label;
		@apply md:max-w-[80vw];
	}

	textarea {
		@apply outline-color-hover-footer-link;
		@apply px-[clamp(16px,1.2vw,1.2vw)] py-[clamp(8px,0.6vw,0.6vw)];
		@apply md:w-[67.02vw];
	}

	.green {
		@apply text-color-hover-footer-link;
		@apply cursor-pointer;
	}
</style>
