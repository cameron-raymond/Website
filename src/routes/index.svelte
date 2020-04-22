<script>
  import Emoji from "../components/Emoji.svelte";
  import { onMount, onDestroy } from "svelte";
  import { fly, fade } from "svelte/transition";
  let impactVisible = false;
  let introVisible = false;
  onMount(() => {
    setTimeout(() => {
      impactVisible = true;
      setTimeout(() => (introVisible = true), 300);
    }, 500);
  });
</script>

<style>
  .intro {
    margin-top: 10rem;
    margin-bottom: 3rem;
    height: 6.5rem;
    position: relative;
    text-align: left;
    margin-right: 9.5rem;
  }
  @media (min-width: 400) {
    h1 {
      font-size: 4em;
    }
    .intro {
      margin-right: 0rem;
    }
  }
  .intro-svg {
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
<img
  src="intro.svg"
  alt=""
  class="intro-svg"
  out:fade={{ duration: 50, delay: 100 }} />