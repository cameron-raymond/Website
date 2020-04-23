<script>
	import Nav from '../components/Nav.svelte';
	import GoogleAnalytics from '../components/GoogleAnalytics.svelte';
	export let segment;
</script>

<style>
	main {
		position: relative;
		padding-left: 2em;
		padding-right: 2em;
	}
</style>

<GoogleAnalytics/>
<Nav {segment}/>
<main>
	<slot></slot>
</main>