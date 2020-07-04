<script>
	import Nav from '../components/Nav.svelte';
	import HiddenLinks from "../components/HiddenLinks.svelte"
	import Footer from '../components/Footer.svelte'
	import GoogleAnalytics from '../components/GoogleAnalytics.svelte';
	export let segment;
</script>

<style>
	main {
		display: flex;
		flex-direction: column;
		position: relative;
		padding-left: 2rem;
		padding-right: 2rem;
		min-height: 80vh;
	}
</style>

<GoogleAnalytics/>
<Nav {segment}/>
<main>
	<slot></slot>
</main>
<Footer/>
<HiddenLinks/>