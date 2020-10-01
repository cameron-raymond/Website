<script>
  import Nav from "../components/Nav.svelte";
  import HiddenLinks from "../components/HiddenLinks.svelte";
  import Footer from "../components/Footer.svelte";
  import GoogleAnalytics from "../components/GoogleAnalytics.svelte";
  export let segment;
  let h = 1000;
  let y = 0;
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

<svelte:window bind:scrollY={y} />
<GoogleAnalytics />
<Nav {segment} />
<main bind:clientHeight={h}>
  <slot/>
</main>
<Footer {h} {y} />
<HiddenLinks />
