<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		padding-left: 2em;
		padding-right: 2em;
		/* box-sizing: border-box; */
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>