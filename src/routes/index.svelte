<script>
  import Emoji from "../components/Emoji.svelte";
  import { onMount, onDestroy } from "svelte";
  import { fly, fade } from "svelte/transition";
  let visible = false;
  onMount(() => {
    visible = true;
  });
</script>

<style>
  .cont {
    position: relative;
    height: calc(100vh - 4em);
    width: calc(100vw - 4em);
  }
  .intro {
    padding-left: 1rem;
    padding-top: 10rem;
    padding-right: 8rem;
  }
  @media (min-width: 400) {
    h1 {
      font-size: 4em;
    }
    .intro {
      padding-right: 0rem;
    }
  }
  .intro-svg {
    /* ! Change to this once more content is added */
    /* position: absolute; */
    position: fixed;
    bottom: -5rem;
    right: -1rem;
    width: 100%;
    max-width: 55rem;
    min-width: 40rem;
    overflow: hidden;
    z-index: -1;
  }
</style>

<svelte:head>
  <title>🤯Cameron Raymond🤯</title>
</svelte:head>
<div class="cont">
  {#if visible}
    <div class="intro">
      <h1
        in:fly={{y: 50, duration: 500 }}
        out:fly={{delay: 50, y: 50, duration: 500 }}>
        Hello
        <Emoji symbol="👋" />
      </h1>
      <p
        in:fly={{ delay: 300, y: 50, duration: 500 }}
        out:fly={{ y: 50, duration: 500 }}>
        I'm Cameron - a data scientist
        <Emoji symbol="📈" />
        and incoming graduate student
        <Emoji symbol="🧑‍💻" />
        at the University of Oxford
        <Emoji symbol="🏫🏯" />
      </p>
      <p
        in:fly={{ delay: 350, y: 50, duration: 500 }}
        out:fly={{  y: 50, duration: 500 }}>
        This is a new version of my portfolio so be sure to check back for more posts on my work!
      </p>
    </div>
  {/if}
  <img
    src="intro.svg"
    alt=""
    class="intro-svg"
    out:fade={{ duration: 50, delay: 100 }} />
</div>
<!-- <p>
I love to code
</p><p>
I love to code
</p><p>
I love to code
</p><p>
I love to code
</p><p>
I love to code
</p><p>
I love to code
</p><p>
I love to code
</p><p>
I love to code
</p><p>
I love to code
</p><p>
I love to code
</p><p>
I love to code
</p><p>
I love to code
</p><p>
I love to code
</p> -->