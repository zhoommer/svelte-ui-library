<script lang="ts">
	interface Props {
		size?: number;
		color?: string;
	}

	let { size = 16, color = 'currentColor' }: Props = $props();
</script>

<span
	class="spinner"
	style="width: {size}px; height: {size}px; border-color: {color}; border-right-color: transparent;"
	role="status"
	aria-label="Loading"
></span>

<style>
	.spinner {
		display: inline-block;
		border: 2px solid;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
