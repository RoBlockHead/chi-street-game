<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	export let count = 0;
	
	function addValue(delta: number) {
		count += delta;
		dispatch('change', count);
	}
</script>

<style>
	button {
		width: 2rem
	}
</style>

<div>
	<button on:click={() => addValue(-1)}>
		-
	</button>
	<button on:click={() => addValue(1)}>
		+
	</button>	
</div>

<div style="width:100%;text-align:center;font-weight:600">
	{count}
</div>
