<script>
  import Emoji from "../components/Emoji.svelte";
  import { onMount, onDestroy } from "svelte";
  import { fly } from "svelte/transition";
  let impactVisible = false;
  let introVisible = false;
  let imgVisible = false;
  onMount(() => {
    impactVisible = true;
    setTimeout(() => (introVisible = true), 300);
  });
  onDestroy(() => {
    impactVisible = false;
    setTimeout(() => (introVisible = false), 300);
  });
</script>

<style>
  .intro {
    margin-top: 10rem;
    height: 2rem;
    left: 0rem;
    position: relative;
	text-align: left;
	margin-right: 5rem;
  }
  @media (min-width: 400) {
    h1 {
      font-size: 4em;
    }
  }
  .intro-svg{
	  position: fixed;
	  bottom: 0;
	  right: 0;
	  width: 80%;
	  max-width: 50rem;
	  z-index: -1000;
  }
</style>

<svelte:head>
  <title>🤯Cameron Raymond🤯</title>
</svelte:head>
<div class="intro">
  {#if impactVisible}
    <h1 in:fly={{ y: 50, duration: 500 }} out:fly={{ y: 50, duration: 500 }}>
      Hello
      <Emoji symbol="👋" />
    </h1>
  {/if}
  {#if introVisible}
    <p in:fly={{ y: 50, duration: 500 }} out:fly={{ y: 50, duration: 500 }}>
      I'm Cameron - a data scientist
      <Emoji symbol="📈" />
      and graduate student
      <Emoji symbol="🧑‍💻" />
      at the University of Oxford
      <Emoji symbol="🏫🏯" />
    </p>
  {/if}
</div>
<img src="intro.svg" alt="" class="intro-svg">
