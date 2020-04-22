<script>
  import Emoji from "../components/Emoji.svelte";
  import { onMount, onDestroy } from "svelte";
  import { fly } from "svelte/transition";

  let visible = false;
  onMount(() => {
    setTimeout(() => (visible = true), 500);
  });
</script>

<svelte:head>
  <title>About</title>
</svelte:head>
{#if visible}
  <span in:fly={{ y: -100, duration: 500 }} out:fly={{ y: -100, duration: 500 }}>
    <h1>About this site</h1>

    <p>This is the 'about' page. There's not much here.</p>

  </span>
{/if}
