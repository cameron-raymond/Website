<script>
  import Emoji from "../components/Emoji.svelte";
  import { onMount, onDestroy } from "svelte";
  import { fly } from "svelte/transition";
  let impactVisible = false;
  let introVisible = false;
  let imgVisible = false;
  let absolute = "absolute"
//   $: absolute = impactVisible || introVisible || imgVisible ? "absolute" : "";
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
  .absolute {
    position: absolute;
  }
  .intro {
    margin-top: 10rem;
    height: 2rem;
    left: 0rem;
    position: relative;
    text-align: left;
  }
  @media (min-width: 400) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>🤯Cameron Raymond🤯</title>
</svelte:head>
<div class="intro {absolute}">
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
